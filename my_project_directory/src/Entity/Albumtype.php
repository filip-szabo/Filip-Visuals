<?php

namespace App\Entity;

use App\Repository\AlbumtypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AlbumtypeRepository::class)]
class Albumtype
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'albumstypes', targetEntity: User::class)]
    private Collection $albumstypes;

    public function __construct()
    {
        $this->albumstypes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getAlbumstypes(): Collection
    {
        return $this->albumstypes;
    }

    public function addAlbumstype(User $albumstype): static
    {
        if (!$this->albumstypes->contains($albumstype)) {
            $this->albumstypes->add($albumstype);
            $albumstype->setAlbumstypes($this);
        }

        return $this;
    }

    public function removeAlbumstype(User $albumstype): static
    {
        if ($this->albumstypes->removeElement($albumstype)) {
            // set the owning side to null (unless already changed)
            if ($albumstype->getAlbumstypes() === $this) {
                $albumstype->setAlbumstypes(null);
            }
        }

        return $this;
    }

    public function toArray()
    {
        return ['id'=>$this->id, 'name'=>$this->name];
    }
}
