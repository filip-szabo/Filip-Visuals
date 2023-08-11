<?php

namespace App\Controller;

use App\Entity\City;
use App\Entity\School;
use App\Repository\SchoolRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class SchoolController extends AbstractController
{
    private $entityManager;
    private $schoolRepository;

    public function __construct(EntityManagerInterface $entityManager, SchoolRepository $schoolRepository)
    {
        $this->entityManager = $entityManager;
        $this->schoolRepository= $schoolRepository;
    }


    #[Route('/getSchools', name: 'app_getSchools')]
    public function school(): Response
    {
        $schools = $this->schoolRepository->findAll();
        $arrayOfSchools = [];
        foreach ($schools as $school) {
            $arrayOfSchools[] = $school->toArray();
        }
        return $this->json($arrayOfSchools);
    }

    #[Route('/create-school', name: 'create_school', methods: ['POST'])]
    public function createSchool(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        $school = new School();

        $school->setName($content['name']);
        if (isset($content['cityId'])) {
            $city = $this->entityManager->getRepository(City::class)->find($content['cityId']);
            $school->setCities($city);
        }

        try {
            $this->entityManager->persist($school);
            $this->entityManager->flush();
            $redirectUrl = $this->generateUrl('admin-page');
            return new JsonResponse(['redirectUrl' => $redirectUrl]);
        } catch (\Exception $exception) {
            return $this->json([
                'message' => "An error occurred while adding the school.",
            ]);
        }
    }
    #[Route('/getSchoolsByCity', name: 'get_schools_by_city', methods: ['POST'])]
    public function getSchoolsByCity(SchoolRepository $schoolRepository, Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $city = $this->entityManager->getRepository(City::class)->find($content['cityId']);

        if (!$city) {
            return new JsonResponse(['error' => 'City not found'], 404);
        }


        $schools = $schoolRepository->findBy(['cities' => $content['cityId']]);

        $schoolsData = [];
        foreach ($schools as $school) {
            $schoolsData[] = [
                'id' => $school->getId(),
                'name' => $school->getName(),

            ];
        }

        return new JsonResponse($schoolsData);
    }

}
