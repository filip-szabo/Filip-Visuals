<?php

namespace App\Entity;

use App\Repository\SchoolRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SchoolRepository::class)]
class School
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Clas::class, inversedBy: 'classes')]
    private Collection $classes;

    #[ORM\ManyToOne(inversedBy: 'cities')]
    #[ORM\JoinColumn(nullable: false)]
    private ?City $cities = null;


    #[ORM\OneToMany(mappedBy: 'school', targetEntity: Clas::class)]
    private Collection $school;






    public function __construct()
    {
        $this->classes = new ArrayCollection();
        $this->school = new ArrayCollection();

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
     * @return Collection<int, Clas>
     */
    public function getClasses(): Collection
    {
        return $this->classes;
    }

    public function addClass(Clas $class): static
    {
        if (!$this->classes->contains($class)) {
            $this->classes->add($class);
        }

        return $this;
    }

    public function removeClass(Clas $class): static
    {
        $this->classes->removeElement($class);

        return $this;
    }

    public function getCities(): ?City
    {
        return $this->cities;
    }

    public function setCities(?City $cities): static
    {
        $this->cities = $cities;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */

    /**
     * @return Collection<int, User>
     */

    /**
     * @return Collection<int, User>
     */


    /**
     * @return Collection<int, Clas>
     */
    public function getSchool(): Collection
    {
        return $this->school;
    }

    public function toArray()
    {
        return (['id'=>$this->id, 'name'=>$this->name]);
    }

}

    /**
     * @return Collection<int, User>
     */
