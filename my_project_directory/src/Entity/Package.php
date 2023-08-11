<?php

namespace App\Entity;

use App\Repository\PackageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PackageRepository::class)]
class Package
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'packages', targetEntity: User::class)]
    private Collection $packages;

    public function __construct()
    {
        $this->packages = new ArrayCollection();
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
    public function getPackages(): Collection
    {
        return $this->packages;
    }

    public function addPackage(User $package): static
    {
        if (!$this->packages->contains($package)) {
            $this->packages->add($package);
            $package->setPackages($this);
        }

        return $this;
    }

    public function removePackage(User $package): static
    {
        if ($this->packages->removeElement($package)) {
            // set the owning side to null (unless already changed)
            if ($package->getPackages() === $this) {
                $package->setPackages(null);
            }
        }

        return $this;
    }

    public function toArray()
    {
        return ['id'=>$this->id, 'name'=>$this->name];
    }
}
