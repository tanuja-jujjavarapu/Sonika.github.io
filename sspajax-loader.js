window.addEventListener('mercury:load', function() {
    var oldTag = document.querySelector('.nar-script');
    var scripts = [oldTag] // v2 only needs singular script
    if (oldTag === null) {
      // v1 scripts
      scripts = Array.from(document.querySelectorAll('script'))
        .filter(s => s.src.match('service.getnarrativeapp.com/core/embed') !== null)   
    }
    scripts.forEach(s => {
      var newScript = document.createElement('script')
      newScript.src = s.src
      document.body.appendChild(newScript);
    })
  });
  