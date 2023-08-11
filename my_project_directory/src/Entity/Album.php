<?php

namespace App\Entity;

use App\Repository\AlbumRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AlbumRepository::class)]
class Album
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'albums', targetEntity: User::class)]
    private Collection $albums;

    public function __construct()
    {
        $this->albums = new ArrayCollection();
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
    public function getAlbums(): Collection
    {
        return $this->albums;
    }

    public function addAlbum(User $album): static
    {
        if (!$this->albums->contains($album)) {
            $this->albums->add($album);
            $album->setAlbums($this);
        }

        return $this;
    }

    public function removeAlbum(User $album): static
    {
        if ($this->albums->removeElement($album)) {
            // set the owning side to null (unless already changed)
            if ($album->getAlbums() === $this) {
                $album->setAlbums(null);
            }
        }

        return $this;
    }

    public function toArray()
    {
        return ['id'=>$this->id, 'name'=>$this->name];
    }
}
