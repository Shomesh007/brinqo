# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Console Warnings and Abrupt Transitions
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bugs exist
  - **Scoped PBT Approach**: Test concrete failing cases - console positioning warning on render, abrupt color transitions without early activation at ~20% visibility, and broken animation handling during scroll
  - Test that mobile service section renders without console warnings about positioning context
  - Test that color transitions begin when next item reaches approximately 20% visibility (not abruptly at focal point)
  - Test that animations handle transitions smoothly between service items
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bugs exist)
  - Document counterexamples found: positioning warning message, exact scroll position where abrupt transition occurs, animation frame drops or discontinuities
  - Mark task complete when test is written, run, and failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Existing Service Item Behavior
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for active/inactive states, focal point detection, visual effects, desktop layout, and arrow rotation
  - Observe: Active items display red background (#e73250) and cream text (#fcf9f2)
  - Observe: Inactive items display transparent background and dark text (#1c1c18)
  - Observe: Focal point at 85% viewport height for downward scroll, 15% for upward scroll
  - Observe: Visual effects (sweep gradient, glow radiance, pulsing dot, scaled title, expanded description) work correctly
  - Observe: Desktop viewport (md breakpoint and above) shows grid-based ServiceIconBox layout
  - Observe: Arrow icon rotates from ArrowRight to ArrowDown when active
  - Write property-based tests capturing these observed behavior patterns
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 3. Fix for mobile service animation issues

  - [ ] 3.1 Add container positioning context
    - Locate the mobile service container div at line 865 in src/App.tsx
    - Add 'relative' to the className to establish positioning context
    - This resolves the console warning about non-static position
    - _Bug_Condition: isBugCondition(input) where input.eventType == "render" AND containerPositionIsStatic()_
    - _Expected_Behavior: noConsoleWarnings(result) from design_
    - _Preservation: Desktop layout and all other styling from Preservation Requirements_
    - _Requirements: 1.1, 2.1_

  - [ ] 3.2 Implement visibility tracking in scroll handler
    - Enhance the useEffect scroll handler (lines 768-806) to calculate visibility percentages
    - Add logic to determine what percentage of each service item is visible in viewport
    - Store visibility data to support early transition triggers
    - Maintain existing focal point detection logic (85% down, 15% up)
    - _Bug_Condition: isBugCondition(input) where input.eventType == "scroll" AND input.itemVisibility >= 0.20_
    - _Expected_Behavior: transitionStartsAt20PercentVisibility(result) from design_
    - _Preservation: Focal point detection at 85%/15% from Preservation Requirements_
    - _Requirements: 1.2, 1.3, 2.2, 2.3, 3.3, 3.4_

  - [ ] 3.3 Add early transition logic
    - Introduce transition state when next item reaches approximately 20% visibility
    - Update activation logic to support gradual transitions before focal point activation
    - Ensure smooth progression from transition start to full activation
    - Preserve final activation at focal point (85% down, 15% up)
    - _Bug_Condition: isBugCondition(input) where input.itemVisibility >= 0.20 AND NOT transitionInitiated()_
    - _Expected_Behavior: transitionStartsAt20PercentVisibility(result) AND animationsAreSmooth(result) from design_
    - _Preservation: Active/inactive state styling and focal point behavior from Preservation Requirements_
    - _Requirements: 1.2, 1.3, 1.4, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4_

  - [ ] 3.4 Update ServiceItem animation properties
    - Enhance the animate prop in ServiceItem component (lines 673-676) to support gradual transitions
    - Add intermediate animation states for items in transition zone
    - Implement progressive color/opacity changes based on visibility percentage
    - Maintain existing 0.85s duration and easeInOut easing
    - Preserve all visual effects (sweep gradient, glow radiance, pulsing dot, scaled title, expanded description)
    - _Bug_Condition: isBugCondition(input) where animationHandlingIsBroken()_
    - _Expected_Behavior: animationsAreSmooth(result) from design_
    - _Preservation: All visual effects and animation timing from Preservation Requirements_
    - _Requirements: 1.4, 2.2, 2.3, 2.4, 3.5, 3.7_

  - [ ] 3.5 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - No Warnings and Smooth Transitions
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bugs are fixed)
    - Verify no console warnings appear
    - Verify color transitions start at approximately 20% visibility
    - Verify animations are smooth and seamless
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 3.6 Verify preservation tests still pass
    - **Property 2: Preservation** - Existing Service Item Behavior
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm active state styling preserved (red background, cream text)
    - Confirm inactive state styling preserved (transparent background, dark text)
    - Confirm focal point detection preserved (85% down, 15% up)
    - Confirm visual effects preserved (sweep, glow, pulsing dot, scaled title, expanded description)
    - Confirm desktop layout preserved (grid-based ServiceIconBox)
    - Confirm arrow rotation preserved (ArrowRight to ArrowDown)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Run all tests to verify complete fix
  - Verify no console warnings in browser console
  - Verify smooth color transitions starting at ~20% visibility
  - Verify seamless animation handling during scroll
  - Verify all preservation requirements maintained
  - Ask the user if questions arise
