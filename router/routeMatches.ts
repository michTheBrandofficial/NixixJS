let routeMatches: any[] = []

function changeRouteMatches(newMatches:any[] | null) {
  routeMatches.length = 0;
  newMatches && routeMatches.push(...newMatches)
  return routeMatches;
}

export default changeRouteMatches;