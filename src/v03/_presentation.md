### In version 3 we...

- remove reducer tests
- add individual action creator tests
- test through store instead of calling reducers

### Rationale

- the store is the API for the app
- reducers are an implementation detail (yep!)
- changing reducer setup shouldn't affect tests

### Notes

- all action-related change tests are colocated

### File highlights

- colocation gain in <span data-file-link="redux/slices/ui/actions/setCurrentTheme.test"><code>setCurrentTheme.test</code></span>
- colocation gain in <span data-file-link="redux/slices/ui/actions/setCurrentSet.test"><code>setCurrentSet.test</code></span>
