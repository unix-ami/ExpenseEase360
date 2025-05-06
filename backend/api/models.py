from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.exceptions import ValidationError

class CustomUserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin): 

    ROLE_CHOICES = [
        ('guest', 'Guest User'),
        ('employee', 'Employee'),
        ('line manager', 'Line Manager'),
        ('financeteam', 'Finance Team'),
        ('admin', 'Admin'),
    ]

    REGION_CHOICES = [
        ('europe', 'Europe'),
        ('north_america', 'North America'),
        ('asia', 'Asia'),
        ('australasia', 'Australasia'),
        ('africa', 'Africa'),
    ]

    # FDM countries 
    COUNTRY_CHOICES = [
        ('UK', 'United Kingdom'),
        ('DE', 'Germany'),
        ('LU', 'Luxembourg'),
        ('NL', 'Netherlands'),
        ('IE', 'Republic of Ireland'),
        ('CH', 'Switzerland'),
        ('PL', 'Poland'), 
        ('US', 'United State'), 
        ('CA', 'Canada'), 
        ('CN', 'China'), 
        ('HK', 'Hong Kong'), 
        ('SG', 'Singapore'), 
        ('MY', 'Malaysia'),
        ('AU', 'Australia'),
        ('NZ', 'New Zealand'),
        ('ZA', 'South Africa')
    ]

    BRANCH_CHOICES = [
        ('london', 'London'),
        ('leeds', 'Leeds'),
        ('glasgow', 'Glasgow'),
        ('brighton', 'Brighton'),
        ('frankfurt', 'Frankfurt'),
        ('luxembourg', 'Luxembourg'), #
        ('netherlands', 'Netherlands'), #
        ('dublin', 'Dublin'),
        ('limerick', 'Limerick'),
        ('switzerland', 'Switzerland'),
        ('kraków', 'Kraków'),
        ('austin', 'Austin'),
        ('charlotte', 'Charlotte'),
        ('new york', 'New York'),
        ('st petersburg', 'St Petersburg'),
        ('toronto', 'Toronto'),
        ('montreal', 'Montreal'),
        ('shanghai', 'Shanghai'), #
        ('hong kong', 'Hong Kong'), #
        ('singapore', 'Singapore'), #
        ('malaysia', 'Malaysia'), #
        ('sydney', 'Sydney'),
        ('melbourne', 'Melbourne'),
        ('auckland', 'Auckland'), 
        ('south africa', 'south africa') #
    ] 

    # from https://careers.fdmgroup.com/vacancies
    DEPARTMENT_CHOICES = [
        ('sales', 'Sales'),
        ('marketing', 'Marketing'),
        ('hr', 'HR'),
        ('finance', 'Finance'),
        ('it', 'IT'),
        ('operations', 'Operations'),
        ('legal', 'Legal'),
        ('business_dev', 'Business Development'),
        ('quality_assurance', 'Quality Assurance'),
        ('design', 'Design'),
        ('academy', 'Academy'),
        ('business_support', 'Business Support'),
        ('consulting_services', 'Consulting Services'),
        ('graduate_recruitment', 'Graduate Recruitment'),
        ('it_infrastructure', 'IT Infrastructure'),
        ('people_and_culture', 'People and Culture'),
        ('recruitment', 'Recruitment'),
        ('returners_programme', 'Returners Programme')
    ]

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Admin page access

    region = models.CharField(
        choices=REGION_CHOICES ,
        default='europe', 
        max_length=20
    )

    country = models.CharField(
        choices=COUNTRY_CHOICES,
        default='UK', 
        max_length=20
    )

    branch = models.CharField(
        choices=BRANCH_CHOICES,
        default='london',
        max_length=20
    )

    department = models.CharField(
        choices=DEPARTMENT_CHOICES,
        max_length=30,
        default='sales'
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role', 'region', 'country', 'branch', 'department']

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

    def clean(self):
        super().clean()
        region_country_map = {
            'europe': ['UK', 'DE', 'LU', 'NL', 'IE', 'CH', 'PL'],
            'north_america': ['US', 'CA'],
            'asia': ['CN', 'HK', 'SG', 'MY'],
            'australasia': ['AU', 'NZ'],
            'africa': ['ZA'],
        }

        country_branch_map = {
            'UK': ['london', 'leeds', 'glasgow', 'brighton'],
            'DE': ['frankfurt'],
            'LU': ['luxembourg'],
            'NL': ['netherlands'],
            'IE': ['dublin', 'limerick'],
            'CH': ['switzerland'],
            'PL': ['kraków'],
            'US': ['austin', 'charlotte', 'new york', 'st petersburg'],
            'CN': ['toronto', 'montreal'],
            'CN': ['shanghai'],
            'HK': ['hong kong'],
            'SG': ['singapore'],
            'MY': ['malaysia'],
            'AU': ['sydney', 'melbourne'],
            'NZ': ['auckland'],
            'ZA': ['south africa'],
        }

        # Validate country based on region
        valid_countries = region_country_map.get(self.region, [])
        if self.country not in valid_countries:
            raise ValidationError({
                'country': f"The selected country '{self.country}' is not valid for the region '{self.get_region_display()}'."
            })

        # Validate branch based on country
        valid_branches = country_branch_map.get(self.country, [])
        if self.branch not in valid_branches:
            raise ValidationError({
                'branch': f"The selected branch '{self.branch}' is not valid for the country '{self.get_country_display()}'."
            })

