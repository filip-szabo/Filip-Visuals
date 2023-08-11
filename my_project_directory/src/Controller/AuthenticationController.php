<?php

namespace App\Controller;

use App\Entity\Clas;
use App\Entity\School;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\DBAL\Exception\NotNullConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


class AuthenticationController extends AbstractController
{
    private $entityManager;
    private $passwordHasher;
    private $userRepository;

    public function __construct (EntityManagerInterface $entityManager, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/register-user', name: 'register-user', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $content = json_decode($request->getContent(), true);

        $user = new User();

        $user->setName($content['name']);
        $user->setEmail($content['email']);

        $plaintextPassword = $content['password'];
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);

        if (isset($content['classId'])) {
            $class = $this->entityManager->getRepository(Clas::class)->find($content['classId']);
            $user->setClasses($class);
        }

        try {
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            $redirectUrl = $this->generateUrl('login');
            return new JsonResponse(['redirectUrl' => $redirectUrl]);
        } catch (NotNullConstraintViolationException $exception) {
            return $this->json([
                'message' => "An error occurred while creating your account. Some required fields are missing or invalid.",
            ], Response::HTTP_BAD_REQUEST);
        } catch (Exception $exception) {
            return $this->json([
                'message' => "An error occurred while creating your account.",
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route("/authenticate", name:"authenticate", methods:["POST"])]

    public function authenticate(Request $request, SessionInterface $session): Response
    {
        $content = json_decode($request->getContent(), true);

        $email = $content['email'];
        $password = $content['password'];
        $rememberMe = $content['rememberMe'] ?? false; // Default to false if not provided

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $session->start();
        $session->set('user', json_encode([
            'id' => $user->getId(),
            'name' => $user->getName(),
            'role' => $user->getRole(),
            'album' => $user->getAlbums() ? $user->getAlbums()->getName() : null,
            'albumType' => $user->getAlbumstypes() ? $user->getAlbumstypes()->getName() : null,
            'package' => $user->getPackages() ? $user->getPackages()->getName() : null,
        ]));

        if ($user->getRole() === 'Admin') {
            $response = new JsonResponse(['redirectUrl' => $this->generateUrl('admin-page')]);
            $response->headers->clearCookie('remember_me');
        } else if ($rememberMe) {
            $cookie = Cookie::create('remember_me', $email, strtotime('now + 1 month'));
            $response = new JsonResponse(['redirectUrl' => $this->generateUrl('user-page')]);
            $response->headers->setCookie($cookie);
        } else {
            $response = new JsonResponse(['redirectUrl' => $this->generateUrl('user-page')]);
            $response->headers->clearCookie('remember_me');
        }
        return $response;
    }


    #[Route("/logout_user", name:"logout_user", methods:["POST"])]

    public function logout(Request $request, SessionInterface $session): Response
    {
        $session->invalidate();

        $redirectUrl = $this->generateUrl('homepage');
        return new JsonResponse(['redirectUrl' => $redirectUrl]);
    }

    #[Route("/session_stop", name:"session_stop", methods:["POST"])]

    public function sessionStop(Request $request, SessionInterface $session): Response
    {
        $session->invalidate();

        $redirectUrl = $this->generateUrl('homepage');
        return new JsonResponse(['redirectUrl' => $redirectUrl]);
    }

}