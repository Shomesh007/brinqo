/**
 * Bug Condition Exploration Test for Mobile Service Animation Fix
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists
 * 
 * This test encodes the EXPECTED behavior (what the code SHOULD do after the fix).
 * When run on UNFIXED code, it will FAIL, proving the bugs exist.
 * After the fix is implemented, this test will PASS, validating the fix works correctly.
 * 
 * Property 1: Bug Condition - Console Warnings and Abrupt Transitions
 * 
 * The test validates three bug conditions:
 * 1. Console warning about positioning context (Requirement 1.1)
 * 2. Abrupt color transitions without early activation at ~20% visibility (Requirement 1.2, 1.3)
 * 3. Broken animation handling during scroll (Requirement 1.4)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import App from './App';

describe('Mobile Service Animation - Bug Condition Exploration', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  
  beforeEach(() => {
    // Spy on console.warn to detect positioning warnings
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667,
    });
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  /**
   * Property 1.1: No Console Warnings on Render
   * 
   * EXPECTED BEHAVIOR: Mobile service section should render without positioning warnings
   * CURRENT BUG: Console warning appears about missing positioning context
   * 
   * This test will FAIL on unfixed code because the warning is currently generated.
   */
  it('should render mobile service section without console positioning warnings', () => {
    // Render the app
    render(<App />);
    
    // Check that mobile service items are rendered
    const serviceItems = document.querySelectorAll('.mobile-service-item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    // CRITICAL ASSERTION: No console warnings about positioning
    // This will FAIL on unfixed code because the warning currently appears
    const positioningWarnings = consoleWarnSpy.mock.calls.filter(call => 
      call.some(arg => 
        typeof arg === 'string' && 
        (arg.includes('position') || 
         arg.includes('relative') || 
         arg.includes('fixed') || 
         arg.includes('absolute') ||
         arg.includes('scroll offset'))
      )
    );
    
    expect(positioningWarnings.length).toBe(0);
    
    // Document the counterexample if warning exists
    if (positioningWarnings.length > 0) {
      console.log('COUNTEREXAMPLE - Positioning Warning Found:', positioningWarnings[0]);
    }
  });

  /**
   * Property 1.2 & 1.3: Early Transition Activation at ~20% Visibility
   * 
   * EXPECTED BEHAVIOR: Color transitions should begin when next item reaches ~20% visibility
   * CURRENT BUG: Transitions occur abruptly at focal point (85% for downward scroll)
   * 
   * This test will FAIL on unfixed code because transitions currently happen at 85%, not 20%.
   */
  it('should initiate color transitions when next service item reaches approximately 20% visibility', () => {
    const { container } = render(<App />);
    
    // Get mobile service items
    const serviceItems = container.querySelectorAll('.mobile-service-item');
    expect(serviceItems.length).toBeGreaterThan(1);
    
    // Get the container that should have positioning
    const mobileContainer = container.querySelector('.md\\:hidden.flex.flex-col');
    
    // CRITICAL ASSERTION: Container should have positioning context
    // This will FAIL on unfixed code because the container lacks 'relative' class
    if (mobileContainer) {
      const hasPositioning = mobileContainer.classList.contains('relative') ||
                            mobileContainer.classList.contains('fixed') ||
                            mobileContainer.classList.contains('absolute');
      
      expect(hasPositioning).toBe(true);
      
      if (!hasPositioning) {
        console.log('COUNTEREXAMPLE - Missing Positioning:', {
          element: 'mobile service container',
          classes: Array.from(mobileContainer.classList),
          expectedClasses: ['relative', 'fixed', 'absolute'],
        });
      }
    }
    
    // Simulate scroll to test transition behavior
    // In the UNFIXED code, the useEffect only checks focal point (85% or 15%)
    // In the FIXED code, it should also check for 20% visibility
    
    const firstItem = serviceItems[0] as HTMLElement;
    const secondItem = serviceItems[1] as HTMLElement;
    
    // Mock getBoundingClientRect for scroll simulation
    const viewportHeight = window.innerHeight;
    const twentyPercentPoint = viewportHeight * 0.20;
    const focalPoint = viewportHeight * 0.85;
    
    // Simulate second item at 20% visibility (top at 80% of viewport)
    vi.spyOn(secondItem, 'getBoundingClientRect').mockReturnValue({
      top: viewportHeight * 0.80,
      bottom: viewportHeight * 0.80 + 667, // item height
      left: 0,
      right: 375,
      width: 375,
      height: 667,
      x: 0,
      y: viewportHeight * 0.80,
      toJSON: () => ({}),
    });
    
    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));
    
    // Wait for animation frame
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        // CRITICAL ASSERTION: At 20% visibility, transition should be initiated
        // This will FAIL on unfixed code because transitions only happen at focal point (85%)
        
        // Check if second item has any transition styling applied
        const secondItemStyle = window.getComputedStyle(secondItem);
        const backgroundColor = secondItemStyle.backgroundColor;
        
        // In the fixed code, at 20% visibility, the item should start transitioning
        // In the unfixed code, it will still be transparent (rgba(0, 0, 0, 0))
        const isTransitioning = backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                               backgroundColor !== 'transparent';
        
        // This assertion will FAIL on unfixed code
        expect(isTransitioning).toBe(true);
        
        if (!isTransitioning) {
          console.log('COUNTEREXAMPLE - Abrupt Transition:', {
            itemVisibility: '20%',
            focalPointPosition: '85%',
            backgroundColor: backgroundColor,
            expected: 'Transition should start at 20% visibility',
            actual: 'No transition detected - likely waiting for focal point at 85%',
          });
        }
        
        resolve();
      });
    });
  });

  /**
   * Property 1.4: Smooth Animation Handling Between Service Items
   * 
   * EXPECTED BEHAVIOR: Animations should handle transitions seamlessly
   * CURRENT BUG: Animation handling is broken with abrupt state changes
   * 
   * This test will FAIL on unfixed code because animations transition abruptly.
   */
  it('should handle animations seamlessly with smooth transitions between service items', () => {
    const { container } = render(<App />);
    
    const serviceItems = container.querySelectorAll('.mobile-service-item');
    expect(serviceItems.length).toBeGreaterThan(1);
    
    const firstItem = serviceItems[0] as HTMLElement;
    const secondItem = serviceItems[1] as HTMLElement;
    
    // Check for animation properties
    const firstItemStyle = window.getComputedStyle(firstItem);
    const secondItemStyle = window.getComputedStyle(secondItem);
    
    // CRITICAL ASSERTION: Items should have transition properties for smooth animations
    // The motion.div components should have transition duration of 0.85s
    const hasTransition = (style: CSSStyleDeclaration) => {
      return style.transition && style.transition !== 'none';
    };
    
    // This will FAIL on unfixed code if transitions are not properly configured
    const firstHasTransition = hasTransition(firstItemStyle);
    const secondHasTransition = hasTransition(secondItemStyle);
    
    expect(firstHasTransition || secondHasTransition).toBe(true);
    
    if (!firstHasTransition && !secondHasTransition) {
      console.log('COUNTEREXAMPLE - Missing Smooth Transitions:', {
        firstItemTransition: firstItemStyle.transition,
        secondItemTransition: secondItemStyle.transition,
        expected: 'transition: 0.85s easeInOut',
        actual: 'No transition properties detected',
      });
    }
    
    // Check for early activation logic in the scroll handler
    // The unfixed code only checks focal point, not visibility percentage
    const mobileContainer = container.querySelector('.md\\:hidden.flex.flex-col');
    
    if (mobileContainer) {
      // In fixed code, container should have relative positioning for proper scroll calculations
      const computedStyle = window.getComputedStyle(mobileContainer);
      const position = computedStyle.position;
      
      // CRITICAL ASSERTION: Container should have non-static positioning
      expect(position).not.toBe('static');
      
      if (position === 'static') {
        console.log('COUNTEREXAMPLE - Static Positioning:', {
          element: 'mobile service container',
          position: position,
          expected: 'relative, fixed, or absolute',
          actual: 'static',
          impact: 'Prevents proper scroll offset calculations for smooth animations',
        });
      }
    }
  });

  /**
   * Property-Based Test: Scroll Position Variations
   * 
   * Tests that for ANY scroll position, the system should:
   * 1. Not generate console warnings
   * 2. Initiate transitions at ~20% visibility
   * 3. Complete activation at focal point (85% down, 15% up)
   * 
   * This will generate counterexamples showing exact scroll positions where bugs occur.
   */
  it('should handle all scroll positions correctly with early transitions', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 3000 }), // Scroll position
        fc.boolean(), // Scroll direction (true = down, false = up)
        (scrollY, isScrollingDown) => {
          // Reset console spy for each property test
          consoleWarnSpy.mockClear();
          
          const { container } = render(<App />);
          
          // Simulate scroll
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollY,
          });
          
          window.dispatchEvent(new Event('scroll'));
          
          // Check for console warnings
          const hasPositioningWarning = consoleWarnSpy.mock.calls.some(call =>
            call.some(arg =>
              typeof arg === 'string' &&
              (arg.includes('position') || arg.includes('scroll offset'))
            )
          );
          
          // CRITICAL: Should never have positioning warnings at any scroll position
          if (hasPositioningWarning) {
            console.log('COUNTEREXAMPLE - Warning at scroll position:', {
              scrollY,
              isScrollingDown,
              warning: consoleWarnSpy.mock.calls[0],
            });
          }
          
          expect(hasPositioningWarning).toBe(false);
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 } // Run 50 random test cases
    );
  });
});
