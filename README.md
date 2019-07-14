Trivial firefox extension to trigger external programs when certain websites are visited.  

The basic idea is that you'll forward some URLs to a server, which will decide how to best render those resources. In addition, it can also block some *other* URLs.

Example 1:

Forward `.mp4` and block `.mp4`:  
All mp4 files will be rendered with an external program.


Forward `https://www.youtube.com/watch?v` and block `.googlevideo.com/videoplayback`:  
Youtube videos will be forwarded, and the media playback within the page will be blocked. The rendering for the rest of the page will work fine (so you can navigate via 'recommended' videos, opening each externally).
