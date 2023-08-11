<?php

namespace App\Entity;

use App\Repository\RoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoleRepository::class)]
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'example', targetEntity: User::class)]
    private Collection $examples;



    public function __construct()
    {
        $this->roles = new ArrayCollection();
        $this->examples = new ArrayCollection();
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

    /**
     * @return Collection<int, User>
     */
    public function getRoles(): Collection
    {
        return $this->roles;
    }

    public function addRole(User $role): static
    {
        if (!$this->roles->contains($role)) {
            $this->roles->add($role);
            $role->setRoles($this);
        }

        return $this;
    }

    public function removeRole(User $role): static
    {
        if ($this->roles->removeElement($role)) {
            // set the owning side to null (unless already changed)
            if ($role->getRoles() === $this) {
                $role->setRoles(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getExamples(): Collection
    {
        return $this->examples;
    }

    public function addExample(User $example): static
    {
        if (!$this->examples->contains($example)) {
            $this->examples->add($example);
            $example->setExample($this);
        }

        return $this;
    }

    public function removeExample(User $example): static
    {
        if ($this->examples->removeElement($example)) {
            // set the owning side to null (unless already changed)
            if ($example->getExample() === $this) {
                $example->setExample(null);
            }
        }

        return $this;
    }


}
