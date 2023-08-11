<?php

namespace App\Controller;

use App\Entity\Album;
use App\Entity\Albumtype;
use App\Entity\Package;
use App\Entity\User;
use App\Repository\AlbumRepository;
use App\Repository\AlbumtypeRepository;
use App\Repository\PackageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class AlbumController extends AbstractController
{
    private $entityManager;
    private $albumRepository;
    private $albumTypeRepository;
    private $packageRepository;

    public function __construct(EntityManagerInterface $entityManager, AlbumRepository $albumRepository, AlbumtypeRepository $albumTypeRepository, PackageRepository $packageRepository )
    {
        $this->entityManager = $entityManager;
        $this->albumRepository= $albumRepository;
        $this->albumTypeRepository= $albumTypeRepository;
        $this->packageRepository= $packageRepository;
    }

    #[Route('/getAlbums', name: 'app_getAlbums')]
    public function album(): Response
    {
        $albums = $this->albumRepository->findAll();
        $arrayOfAlbums = [];
        foreach ($albums as $album) {
            $arrayOfAlbums[] = $album->toArray();
        }
        return $this->json($arrayOfAlbums);
    }

    #[Route('/getAlbumType', name: 'app_getAlbumType')]
    public function albumType(): Response
    {
        $albumTypes = $this->albumTypeRepository->findAll();
        $arrayOfAlbumType = [];
        foreach ($albumTypes as $albumType) {
            $arrayOfAlbumType[] = $albumType->toArray();
        }
        return $this->json($arrayOfAlbumType);
    }

#[Route('/getPackages', name: 'app_getPackages')]
    public function packages(): Response
    {
        $packages = $this->packageRepository->findAll();
        $arrayOfPackages= [];
        foreach ($packages as $package) {
            $arrayOfPackages[] = $package->toArray();
        }
        return $this->json($arrayOfPackages);
    }

        #[Route('/addAlbum', name: 'addAlbum', methods: ['POST'])]
        public function addAlbum(Request $request, SessionInterface $session)
        {
            $content = json_decode($request->getContent(), true);

            $user = json_decode($session->get('user'));
            $userId = $user->id;

            $userRepository = $this->entityManager->getRepository(User::class);
            $user = $userRepository->find($userId);

            if (isset($content['album'])) {
                $album = $this->entityManager->getRepository(Album::class)->find($content['album']);
                $user->setAlbums($album);
            }
            if (isset($content['albumType'])) {
                $albumType = $this->entityManager->getRepository(Albumtype::class)->find($content['albumType']);
                $user->setAlbumsTypes($albumType);
            }
            if (isset($content['packages'])) {
                $package = $this->entityManager->getRepository(Package::class)->find($content['packages']);
                $user->setPackages($package);
            }


            try {
                $this->entityManager->persist($user);
                $this->entityManager->flush();

                $session->set('user', json_encode([
                    'id' => $user->getId(),
                    'name' => $user->getName(),
                    'role' => $user->getRole(),
                    'album' => $user->getAlbums() ? $user->getAlbums()->getName() : null,
                    'albumType' => $user->getAlbumstypes() ? $user->getAlbumstypes()->getName() : null,
                    'package' => $user->getPackages() ? $user->getPackages()->getName() : null,
                ]));

                $redirectUrl = $this->generateUrl('user-page');
                return new JsonResponse(['redirectUrl' => $redirectUrl]);
            } catch (Exception $exception) {
                return $this->json([
                    'message' => "An error occurred while adding your album.",
                ]);
            }
        }
}
