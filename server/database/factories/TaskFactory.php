<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $titles = [
            'Implement user authentication',
            'Optimize database queries',
            'Fix bugs in registration process',
            'Refactor codebase for readability',
            'Write unit tests for core functionality',
            'Integrate third-party API for payment gateway',
            'Design RESTful API endpoints',
            'Deploy application to production server',
        ];

        return [
            'title' => $this->faker->randomElement($titles),
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'user_id' => $this->faker->boolean(50) ? \App\Models\User::factory() : null,
        ];
    }
}
