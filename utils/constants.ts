/*******************************************************************************
 * Movies FE - the frontend implementation of a movie tracker.
 * Copyright (C) 2015-present Brian Duffey and Billy Alexander
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see {http://www.gnu.org/licenses/}.
 * Home: https://asitewithnoname.com/
 */
export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const NEXT_PUBLIC_ENV = process.env.NEXT_PUBLIC_ENV;

export const NEXT_PUBLIC_SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DS;

export const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const ITEMS_PER_PAGE = 25;

export const VIEWS = ['Grid', 'List', 'Detail'] as const;
