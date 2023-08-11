<?php

namespace App\Controller;


use App\Entity\Album;
use App\Entity\Albumtype;
use App\Entity\Clas;
use App\Entity\Image;
use App\Entity\Images;
use App\Entity\Package;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class UserController extends AbstractController
{
    private $userRepository;
    private $entityManager;

    public function __construct(UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $this->userRepository= $userRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/get_users', name: 'get_users')]
    public function getUsers(): JsonResponse
    {
        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findAll();

        $userData = [];
        foreach ($users as $user) {
            $userData[] = [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'class' => $user->getClasses() ? $user->getClasses()->getId() : null,
                'className' => $user->getClasses() ? $user->getClasses()->getName() : null,
                'album' => $user->getAlbums() ? $user->getAlbums()->getName() : null,
                'albumtype' => $user->getAlbumstypes() ? $user->getAlbumstypes()->getName() : null,
                'packages' => $user->getPackages() ? $user->getPackages()->getName() : null,
            ];
        }

        return new JsonResponse($userData);
    }

    #[Route('/get_username', name: 'get_username', methods: ["GET"])]
    public function getUsername(Request $request, UserRepository $userRepository): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'User is not authenticated.'], 401);
        }

        $username = $user->getName();

        return new JsonResponse(['name' => $username]);
    }

    #[Route('/update-user', name: 'update_user', methods: ["PUT"])]
    public function updateUser(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $user = $this->entityManager->getRepository(User::class)->find($content['id']);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        if (isset($content['name'])) {
            $user->setName($content['name']);
        }
        if (isset($content['email'])) {
            $user->setEmail($content['email']);
        }
        if (isset($content['albumId'])) {
            $album = $this->entityManager->getRepository(Album::class)->find($content['albumId']);
            $user->setAlbums($album);
        }
        if (isset($content['albumTypeId'])) {
            $albumType = $this->entityManager->getRepository(Albumtype::class)->find($content['albumTypeId']);
            $user->setAlbumstypes($albumType);
        }
        if (isset($content['packagesId'])) {
            $packages = $this->entityManager->getRepository(Package::class)->find($content['packagesId']);
            $user->setPackages($packages);
        }

        $this->entityManager->flush();

        $redirectUrl = $this->generateUrl('show_users');
        return new JsonResponse(['redirectUrl' => $redirectUrl]);
    }

    #[Route('/delete-user/{id}', name: 'delete_user', methods: ["DELETE"])]
    public function deleteUser(Request $request, EntityManagerInterface $entityManager, $id): Response
    {
        $userRepository = $entityManager->getRepository(User::class);
        $user = $userRepository->find($id);

        if (!$user) {
            return new Response('User not found', Response::HTTP_NOT_FOUND);
        }

        try {
            $entityManager->remove($user);
            $entityManager->flush();

            $redirectUrl = $this->generateUrl('admin-page');
            return new JsonResponse(['redirectUrl' => $redirectUrl]);
        } catch (\Exception $e) {
            return new Response('Error deleting user: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/upload-images', name: 'upload_images', methods: ["POST"])]
    public function uploadImage(Request $request,EntityManagerInterface $entityManager): Response
    {
        $currentUserId = $request->request->get('currentUserId');
        $image_file = $_FILES["uploadfile"];

        if (!isset($image_file)) {
            die('No file uploaded.');
        }

        $uploadDirectory = $this->getParameter('kernel.project_dir') . '/public/image';
        move_uploaded_file(

            $image_file["tmp_name"],

            $uploadDirectory . $image_file["name"]
        );

        $image = new Image();
        $image->setName($image_file["name"]);

        if (isset($currentUserId)) {
            $userId = $this->entityManager->getRepository(User::class)->find($currentUserId);
            $image->setUser($userId);
        }

        $entityManager->persist($image);
        $entityManager->flush();

        return new Response('Image upload', Response::HTTP_OK);
    }

    #[Route('/see-user-image/{userId}', name: 'see_user_image', methods: ["GET"])]
    public function seeUserImage(EntityManagerInterface $entityManager, $userId)
    {
        $images = $this->entityManager->getRepository(Image::class)->findBy(['user' => $userId]);

        $imageData = [];
        foreach ($images as $image) {
            $imageData[] = [
                'id' => $image->getId(),
                'name' => $image->getName(),
            ];
        }

        return new JsonResponse($imageData);
    }

}
