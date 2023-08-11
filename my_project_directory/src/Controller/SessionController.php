<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class SessionController extends AbstractController
{
     #[Route("/api/session", name:"api_session")]
    public function getSession(SessionInterface $sessionManager):Response
    {

        $sessionData = $sessionManager->get('user');

        return new JsonResponse($sessionData);
    }


}
