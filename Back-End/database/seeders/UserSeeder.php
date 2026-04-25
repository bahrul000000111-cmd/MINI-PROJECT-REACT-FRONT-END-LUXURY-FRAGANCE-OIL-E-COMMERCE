<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michael@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Emily Davis',
                'email' => 'emily@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'David Wilson',
                'email' => 'david@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Sarah Miller',
                'email' => 'sarah@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'James Taylor',
                'email' => 'james@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Jessica Anderson',
                'email' => 'jessica@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Robert Thomas',
                'email' => 'robert@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Laura Jackson',
                'email' => 'laura@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Daniel White',
                'email' => 'daniel@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Sophia Harris',
                'email' => 'sophia@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Christopher Martin',
                'email' => 'chris@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Olivia Thompson',
                'email' => 'olivia@example.com',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}

