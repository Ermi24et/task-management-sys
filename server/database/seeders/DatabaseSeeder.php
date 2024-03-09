<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(2)->create();

        $users->each(function ($user) use ($users) {
            Task::factory()->count(5)->create([
                'assigned_by' => $users->random()->id,
                'assigned_to' => $user->id,
            ]);

            Task::factory()->count(5)->create([
                'user_id' => $user->id,
            ]);
        });

        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'siaw@email.com',
            'password' => bcrypt('password'),
        ]);

        Task::factory()->count(5)->create([
            'user_id' => $testUser->id
        ]);

        Task::factory()->count(5)->create();

        $unassignedTasks = Task::whereNull('assigned_to')->get();
        foreach ($unassignedTasks as $task) {
            $assignee = $testUser->id;
            $assigner = $users->random()->id;
            $task->assigned_to = $assignee;
            $task->assigned_by = $assigner;
            $task->save();
        }
    }
}
