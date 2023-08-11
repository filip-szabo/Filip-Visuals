<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    private $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }


    //nav-bar
    #[Route('/', name: 'homepage')]
    public function index(SessionInterface $session): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    #[Route('/about-us', name: 'about-us')]
    public function about(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    #[Route('/login', name: 'login')]
    public function login(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    #[Route('/register', name: 'register')]
    public function register(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    //admin page
    #[Route('/admin-page', name: 'admin-page')]
    public function admins(SessionInterface $session): Response
    {
        $isLoggedIn = $session->get('user');
        if(isset($isLoggedIn)) {
            return $this->render('./index.html.twig', [
                'controller_name' => 'IndexController',
            ]);
        }
        return $this->redirectToRoute('login');
    }

    #[Route('/add-attributes', name: 'add-attributes')]
    public function createSchool(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }
    #[Route('/create-user', name: 'create-user')]
    public function createUser(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    //user page
    #[Route('/user-page', name: 'user-page')]
    public function users(SessionInterface $session): Response
    {
        $isLoggedIn = $session->get('user');

        if ($isLoggedIn) {
            return $this->render('index.html.twig', [
                'controller_name' => 'IndexController',
            ]);
        }

        return $this->redirectToRoute('login');
    }
    #[Route('/albums-and-features', name: 'albums-and-features')]
    public function albumsAndFeatures(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    #[Route('/see-images', name: 'see_images')]
    public function selectImages(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    #[Route('/show-users', name: 'show_users')]
    public function showUsers(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    #[Route('/update-user/{id}', name: 'update_user')]
    public function updateUser(): Response
    {
        return $this->render('./index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

}
