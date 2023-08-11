<?php

namespace App\Controller;

use App\Entity\City;
use App\Entity\Clas;
use App\Entity\School;
use App\Repository\ClasRepository;
use App\Repository\SchoolRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ClassController extends AbstractController
{

    private $entityManager;
    private $clasRepository;

    public function __construct(EntityManagerInterface $entityManager, ClasRepository $clasRepository )
    {
        $this->entityManager = $entityManager;
        $this->clasRepository= $clasRepository;
    }

    #[Route('/getClasses', name: 'app_getClasses')]
    public function clas(): Response
    {
        $classes = $this->clasRepository->findAll();
        $arrayOfClasses = [];
        foreach ($classes as $clas) {
            $arrayOfClasses[] = $clas->toArray();
        }
        return $this->json($arrayOfClasses);
    }

    #[Route('/create-class', name: 'create_class', methods: ['POST'])]
    public function createClass(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        $class = new Clas();

        $class->setName($content['name']);
        if (isset($content['schoolId'])) {
            $school = $this->entityManager->getRepository(School::class)->find($content['schoolId']);
            $class->setSchool($school);
        }

        try {
            $this->entityManager->persist($class);
            $this->entityManager->flush();
            $redirectUrl = $this->generateUrl('admin-page');
            return new JsonResponse(['redirectUrl' => $redirectUrl]);
        } catch (\Exception $exception) {
            return $this->json([
                'message' => "An error occurred while adding the city.",
            ]);
        }
    }

    #[Route('/getClassesBySchool', name: 'get_classes_by_school', methods: ['POST'])]
    public function getClassesBySchool(ClasRepository $clasRepository, Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $school = $this->entityManager->getRepository(School::class)->find($content['schoolId']);

        if (!$school) {
            return new JsonResponse(['error' => 'City not found'], 404);
        }


        $classes = $clasRepository->findBy(['school' => $content['schoolId']]);

        $classesData = [];
        foreach ($classes as $class) {
            $classesData[] = [
                'id' => $class->getId(),
                'name' => $class->getName(),

            ];
        }

        return new JsonResponse($classesData);
    }

}
