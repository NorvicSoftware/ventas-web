<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'sale_price' => $this->faker->randomFloat(2, 0,500),
            'quantity' => $this->faker->numberBetween(1, 100),
            'status' => $this->faker->randomElement(['Activo', 'Descontinuado']),
            'category_id' => Category::all()->random()->id,

        ];
    }
}
