<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;


    /**
     * @var string The hashed password
     */
    #[ORM\Column(nullable: true)]
    private ?string $password = null;

    #[ORM\ManyToOne(inversedBy: 'classes')]
    private ?Clas $classes = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'albums')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Album $albums = null;

    #[ORM\ManyToOne(inversedBy: 'albumstypes')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Albumtype $albumstypes = null;

    #[ORM\ManyToOne(inversedBy: 'packages')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Package $packages = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $role = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Image::class)]
    private Collection $user;

    public function __construct()
    {
        $this->user = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }


    public function getClasses(): ?Clas
    {
        return $this->classes;
    }

    public function setClasses(?Clas $classes): static
    {
        $this->classes = $classes;

        return $this;
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

    public function getAlbums(): ?Album
    {
        return $this->albums;
    }

    public function setAlbums(?Album $albums): static
    {
        $this->albums = $albums;

        return $this;
    }

    public function getAlbumstypes(): ?Albumtype
    {
        return $this->albumstypes;
    }

    public function setAlbumstypes(?Albumtype $albumstypes): static
    {
        $this->albumstypes = $albumstypes;

        return $this;
    }

    public function getPackages(): ?Package
    {
        return $this->packages;
    }

    public function setPackages(?Package $packages): static
    {
        $this->packages = $packages;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(?string $role): static
    {
        $this->role = $role;

        return $this;
    }

    public function toArray()
    {
        return ['id'=>$this->id, 'name'=>$this->name, 'email'=>$this->email, 'password'=>$this->password, 'classes_id'=>$this->classes];
    }

    /**
     * @return Collection<int, Image>
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(Image $user): static
    {
        if (!$this->user->contains($user)) {
            $this->user->add($user);
            $user->setUser($this);
        }

        return $this;
    }

    public function removeUser(Image $user): static
    {
        if ($this->user->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getUser() === $this) {
                $user->setUser(null);
            }
        }

        return $this;
    }
}
