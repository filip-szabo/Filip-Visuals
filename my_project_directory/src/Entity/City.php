<?php

namespace App\Entity;

use App\Repository\CityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CityRepository::class)]
class City
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'cities', targetEntity: School::class, orphanRemoval: true)]
    private Collection $cities;

    public function __construct()
    {
        $this->cities = new ArrayCollection();
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
     * @return Collection<int, School>
     */
    public function getCities(): Collection
    {
        return $this->cities;
    }

    public function addCity(School $city): static
    {
        if (!$this->cities->contains($city)) {
            $this->cities->add($city);
            $city->setCities($this);
        }

        return $this;
    }

    public function removeCity(School $city): static
    {
        if ($this->cities->removeElement($city)) {
            // set the owning side to null (unless already changed)
            if ($city->getCities() === $this) {
                $city->setCities(null);
            }
        }

        return $this;
    }

    public function toArray()
    {
        return (['id'=>$this->id, 'name'=>$this->name]);
    }
}
