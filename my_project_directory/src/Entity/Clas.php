<?php

namespace App\Entity;

use App\Repository\ClasRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClasRepository::class)]
class Clas
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'classes', targetEntity: User::class)]
    private Collection $classes;

    #[ORM\ManyToOne(inversedBy: 'school')]
    #[ORM\JoinColumn(nullable: false)]
    private ?School $school = null;






    public function __construct()
    {
        $this->classes = new ArrayCollection();
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

    /**
     * @return Collection<int, User>
     */

    /**
     * @return Collection<int, User>
     */

    /**
     * @return Collection<int, User>
     */
    public function getClasses(): Collection
    {
        return $this->classes;
    }

    public function addClass(User $class): static
    {
        if (!$this->classes->contains($class)) {
            $this->classes->add($class);
            $class->setClasses($this);
        }

        return $this;
    }

    public function removeClass(User $class): static
    {
        if ($this->classes->removeElement($class)) {
            // set the owning side to null (unless already changed)
            if ($class->getClasses() === $this) {
                $class->setClasses(null);
            }
        }

        return $this;
    }

    public function getSchool(): ?School
    {
        return $this->school;
    }

    public function setSchool(?School $school): static
    {
        $this->school = $school;

        return $this;
    }

    public function toArray()
    {
        return (['id'=>$this->id, 'name'=>$this->name]);
    }

}
