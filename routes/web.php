<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get("/dashboard", function () {
    return Inertia::render("Dashboard");
})
    ->middleware(["auth", "verified"])
    ->name("dashboard");

Route::middleware("auth")->group(function () {
    Route::get("/", [DashboardController::class, "index"])->name("dashboard");

    Route::get("/profile", [ProfileController::class, "edit"])->name("profile.edit");
    Route::patch("/profile", [ProfileController::class, "update"])->name("profile.update");
    Route::delete("/profile", [ProfileController::class, "destroy"])->name("profile.destroy");

    // Messages
    Route::get("/rooms/{room}/messages", [MessageController::class, "index"])->name("messages.index");
    Route::post("/rooms/{room}/messages", [MessageController::class, "store"])->name("messages.store");

    // Rooms
    Route::post("/rooms/private", [RoomController::class, "findOrCreatePrivate"])->name("rooms.private");
});

require __DIR__ . "/auth.php";
