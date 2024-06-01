<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dni' => $this->faker->postcode(),
            'full_name' => $this->faker->firstName() . ' ' .$this->faker->lastName(),
            'cell_phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
        ];
    }
}
