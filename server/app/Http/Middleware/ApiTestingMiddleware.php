<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Knuckles\Camel\Extraction\ExtractedEndpointData;
use Knuckles\Scribe\Scribe;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;

class ApiTestingMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Scribe::beforeResponseCall(function (Request $request, ExtractedEndpointData $endpointData, Response $response) {
           $user = User::first();
           $request->headers->set('Authorization', 'Bearer ' . $user->createToken('test-token')->plainTextToken);
           Sanctum::actingAs($user, ['*']);

        });
        return $next($request);
    }
}
