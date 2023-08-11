<?php

namespace App\Controller;

use App\Entity\City;
use App\Repository\CityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CityController extends AbstractController
{
    private $entityManager;
    private $cityRepository;

    public function __construct(EntityManagerInterface $entityManager, CityRepository $cityRepository)
    {
        $this->entityManager = $entityManager;
        $this->cityRepository= $cityRepository;
    }


    #[Route('/getCities', name: 'app_getCities')]
    public function city(): Response
    {
        $cities = $this->cityRepository->findAll();
        $arrayOfCities = [];
        foreach ($cities as $city) {
            $arrayOfCities[] = $city->toArray();
        }
        return $this->json($arrayOfCities);
    }

    #[Route('/create-city', name: 'create_city', methods: ['POST'])]
    public function createCity(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        $city = new City();

        $city->setName($content['name']);

        try {
            $this->entityManager->persist($city);
            $this->entityManager->flush();
            $redirectUrl = $this->generateUrl('admin-page');
            return new JsonResponse(['redirectUrl' => $redirectUrl]);
        } catch (\Exception $exception) {
            return $this->json([
                'message' => "An error occurred while adding the city.",
            ]);
        }
    }
}
