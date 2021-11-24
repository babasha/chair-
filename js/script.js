if ( !('inert' in document.createElement('div')) ) {

    var inertLinks = document.querySelectorAll('[inert] a');

    var inertFormElements = document.querySelectorAll(' [inert] button, [inert] input, [inert] textarea, [inert] select');
  

    var l = 0;
    while( l < inertLinks.length) {
      inertLinks[l].setAttribute('tabindex','-1');
      l++;
    }
 
    var f = 0;
    while( f < inertFormElements.length) {
      inertFormElements[f].setAttribute('disabled','');
      f++;
    }
  }