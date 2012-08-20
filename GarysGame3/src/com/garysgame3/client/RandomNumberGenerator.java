package com.garysgame3.client;

import com.google.gwt.user.client.Random;

public class RandomNumberGenerator {
	public int getRandomInteger(int aStart, int aEnd) {
		if (aStart > aEnd) {
			throw new IllegalArgumentException("Start cannot exceed End.");
		}
		// get the range, casting to long to avoid overflow problems
		long range = (long) aEnd - (long) aStart + 1;
		// compute a fraction of the range, 0 <= frac < range
		long fraction = (long) (range * Random.nextDouble());
		int randomNumber = (int) (fraction + aStart);
		return randomNumber;
	}
}
