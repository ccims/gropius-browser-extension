export default `<custom-graph-editor
class="graph"
mode="layout"
classes="component interface issue bug done interface-connect component-connect issue-relation related-to duplicate dependency highlighted"
>
<style slot="style">
svg.my-svg {
  width: 100%;
  height: 100%;
}
</style>
<svg slot="graph" class="my-svg">
  <style>
    /* The show-relations variable is used to show/hide dashed issue relation edges */
    /* It is toggled by the ComponentGraphComponent when the user changes the dashed edges switch */
    :root {
      --show-relations: initial;
    }

    .ghost {
      opacity: 0.5;
    }

    .link-handle {
      display: none;
      fill: black;
      opacity: 0.1;
    }

    .link-handle > * {
      transition: transform 0.25s ease-out;
    }

    .link-handle:hover {
      opacity: 0.7;
    }

    .link-handle:hover > * {
      transform: scale(1.5);
    }

    .text {
      text-overflow: ellipsis;
      word-break: break-word;
    }

    .text.title {
      font-size: 12pt;
      text-overflow: ellipsis;
      word-break: break-all;
    }

    .badge-background {
      fill: white;
      opacity: 0.85;
    }

    .text.badge {
      font-size: 6pt;
      text-anchor: middle;
      text-overflow: clip;
    }

    .background {
      opacity: 0;
    }

    .dropzone {
      stroke-dasharray: 2 1;
      opacity: 0.3;
      transition: opacity 0.2s ease-out;
    }

    .dropzone:hover {
      opacity: 1;
    }

    .node.component rect {
      fill: white;
      stroke: black;
      stroke-width: 1.5;
      fill-opacity: 0.5;
    }

    .node.component.highlighted rect {
      fill: DodgerBlue;
    }

    .component-name {
      font-size: 8pt;
      font-family: 'Arial Narrow', Arial, sans-serif;
      word-break: break-word;
      user-select: none;
    }

    .interface-name {
      font-size: 8pt;
      font-family: 'Arial Narrow', Arial, sans-serif;
      word-break: break-word;
      user-select: none;
    }

    .edge-group.issue-relation {
      opacity: 0.7;
    }

    /* issue relation edge styling (use '.related-to', '.duplicate' and '.dependency' to style the individual types) */
    .edge-group.issue-relation .edge {
      stroke: grey;
      stroke-dasharray: 3 5;
      stroke-width: 3px;
      stroke-linecap: round;
    }

    /* coloring of issue relation edges when issue folder is hovered */
    .edge-group.issue-relation.highlight-outgoing .edge {
      stroke: purple;
    }

    .edge-group.issue-relation.highlight-incoming .edge {
      stroke: #008b8b;
    }

    .related-to {
      display: var(--show-relations);
    }

    .related-to.edge-group.issue-relation.highlight-incoming,
    .related-to.edge-group.issue-relation.highlight-outgoing {
      display: initial;
    }

    .edge-group.issue-relation .marker {
      fill: grey;
    }

    .edge-group.issue-relation.highlight-outgoing .marker {
      fill: purple;
    }

    .edge-group.issue-relation.highlight-incoming .marker {
      fill: #008b8b;
    }
  </style>
  <defs class="templates">
    <path id="icon-folder" d="M 36,29 l3,-24 h -6 M 0,3 l 3,26 h 33 l -3,-26 h -23 l -1,-3 h -8 z"></path>
    <g id="icon-undecided" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-1 -1) scale(0.85 0.85)">
        <circle id="ring" stroke="#00BA39" stroke-width="2" cx="16" cy="16" r="10"></circle>
        <rect id="exclam" fill="#00BA39" x="15" y="10" width="2" height="8"></rect>
        <rect id="dot" fill="#00BA39" x="15" y="20" width="2" height="2"></rect>
    </g>
    <g id="icon-bug" stroke="none" fill="none" fill-rule="evenodd" transform="translate(-1 -1) scale(0.85 0.85)">
        <path d="M16,5 C18.7614237,5 21,7.23857625 21,10 C21,10.3423792 20.9655872,10.6767209 20.9000316,10.9997548 C21.0507855,11.1120501 21.1957294,11.2342462 21.3333022,11.3641649 L24.8356362,8.25259068 L26.1643638,9.74740932 L22.4907621,13.0133863 C22.7546865,13.622313 22.9009805,14.2940721 22.9009805,15 C22.9009805,15.2442571 22.8830821,15.4880712 22.8474788,15.7294892 L27.1788854,16.5161301 L26.8211146,18.4838699 L22.4611146,17.69 L21.8641146,20.674 L25.7682213,25.3598156 L24.2317787,26.6401844 L21.0381198,22.8087468 C20.1297475,24.1456263 18.5994991,25 16.9009805,25 L15.0990195,25 C13.4000729,25 11.8694812,24.1451956 10.9611935,22.807736 L7.76822128,26.6401844 L6.23177872,25.3598156 L10.1351146,20.674 L9.53811456,17.69 L5.17888544,18.4838699 L4.82111456,16.5161301 L9.15247082,15.7299431 C9.0111947,14.7780252 9.15007412,13.8429995 9.51021231,13.0132111 L5.83563616,9.74740932 L7.16436384,8.25259068 L10.6647144,11.3651451 C10.802617,11.2346034 10.9483006,11.111583 11.1012234,10.9968969 C11.0342829,10.6754567 11,10.341732 11,10 C11,7.23857625 13.2385763,5 16,5 Z M20.662995,13.8270049 L20.5930614,13.6745856 C20.5778829,13.6438149 20.5621925,13.613342 20.5460011,13.5831782 L20.5927989,13.6740536 C20.567361,13.62251 20.5404863,13.5718026 20.512227,13.5219836 L20.5460011,13.5831782 C20.518133,13.5312609 20.4887809,13.4802589 20.4580017,13.430229 L20.512227,13.5219836 C20.4835377,13.4714064 20.4534214,13.4217449 20.4219328,13.3730537 L20.4580017,13.430229 C20.4310907,13.3864866 20.4030887,13.3434872 20.3740336,13.3012688 L20.4219328,13.3730537 C20.3839576,13.3143322 20.3439865,13.2570221 20.3021155,13.2012193 L20.3740336,13.3012688 C20.3416681,13.2542403 20.3079959,13.2081808 20.2730694,13.1631429 L20.3021155,13.2012193 C20.2689958,13.1570795 20.2346873,13.1138828 20.1992377,13.0716767 L20.2730694,13.1631429 C20.239098,13.1193365 20.20394,13.0764965 20.1676436,13.0346712 L20.0605208,12.9182041 L20.0605208,12.9182041 C19.9692376,12.8234261 19.8717762,12.7346536 19.7687854,12.652531 C19.7516851,12.6386152 19.7345687,12.6252808 19.7173054,12.6121294 L19.7173565,12.6124267 L19.6173174,12.539156 C19.5954381,12.5238676 19.5733455,12.5088636 19.5510448,12.4941493 L19.4404284,12.4245698 C19.4196314,12.4121117 19.3986709,12.3998984 19.3775509,12.3879338 L19.4399804,12.4244216 C19.3897371,12.3943184 19.3385391,12.3656457 19.2864426,12.3384595 L19.3775509,12.3879338 C19.3185981,12.3545367 19.2584029,12.3230778 19.1970519,12.2936436 L19.2864426,12.3384595 C19.2272919,12.307592 19.1669828,12.2786408 19.1055979,12.2516877 L19.1051516,12.2514524 L19.0221754,12.2165317 C19.016872,12.2143934 19.011561,12.2122699 19.0062427,12.2101611 L18.9312985,12.1816065 L18.9312985,12.1816065 L18.8392258,12.149637 C18.8318965,12.1472259 18.8245548,12.1448422 18.8172006,12.1424861 C18.772016,12.1280301 18.7270549,12.1147913 18.6816684,12.102591 L18.8172006,12.1424861 C18.7521062,12.1216315 18.6860439,12.1029395 18.6190984,12.0864946 L18.4365553,12.0476686 C18.4292922,12.0463597 18.4220199,12.045077 18.4147387,12.0438204 L18.4366759,12.0476908 C18.3744888,12.0364809 18.3116354,12.0271879 18.2481793,12.0198749 L18.4147387,12.0438204 C18.3041967,12.0247441 18.1915838,12.0117172 18.0772533,12.0050927 L17.9009805,12 L14.0990195,12 C13.992514,12 13.8861489,12.0056717 13.7803739,12.0169705 C13.780603,12.0185149 13.7808971,12.0188379 13.7811912,12.019161 L13.6653062,12.0315168 L13.6653062,12.0315168 L13.5106711,12.058258 L13.5106711,12.058258 L13.3175306,12.1034603 C13.301675,12.1077214 13.2858805,12.1121045 13.2701477,12.1166082 C13.2216274,12.1304913 13.173342,12.145643 13.1256774,12.1619228 L13.2701477,12.1166082 C13.1455008,12.1522903 13.0247325,12.1955484 12.9082507,12.2457709 L12.8954184,12.2513394 C12.7802697,12.3016289 12.6693474,12.3587392 12.5630487,12.4220745 C12.5454678,12.4325458 12.5276146,12.4434363 12.5098957,12.4545022 L12.5630487,12.4220745 C12.5108461,12.4531781 12.4597585,12.485783 12.4098331,12.5198186 L12.5098957,12.4545022 C12.4376483,12.4996221 12.3676328,12.5476566 12.2999795,12.59841 L12.2995722,12.5987155 L12.2655303,12.6246461 C12.2539751,12.6335793 12.2424912,12.6425929 12.2310793,12.6516857 L12.1716472,12.7002998 L12.1716472,12.7002998 L12.1048932,12.7580461 C12.0910472,12.7703849 12.0773222,12.7828464 12.0637198,12.7954284 L12.0366109,12.8208167 L12.0366109,12.8208167 L11.986156,12.8697932 C11.9702713,12.8855777 11.95457,12.9015329 11.9390547,12.9176551 C11.922135,12.935238 11.905527,12.9529206 11.8891409,12.9707948 L11.9390547,12.9176551 C11.8977145,12.9606119 11.8576939,13.0047541 11.8190398,13.0500112 L11.8891409,12.9707948 C11.8453751,13.018535 11.8031917,13.0676423 11.7626509,13.1180263 L11.8190398,13.0500112 C11.7814207,13.0940566 11.7450958,13.1391581 11.7101084,13.1852509 L11.7626509,13.1180263 C11.675746,13.2260314 11.5963888,13.3399036 11.5251722,13.4587534 C11.5082615,13.4869824 11.4919822,13.5151821 11.4761601,13.543645 C11.4597989,13.5730738 11.4438506,13.6029316 11.4284043,13.6330607 L11.4761601,13.543645 C11.4512853,13.5883929 11.4275402,13.6337913 11.4049546,13.6797954 L11.4284043,13.6330607 C11.401341,13.6858497 11.375819,13.7394714 11.3518847,13.7938561 L11.4049546,13.6797954 C11.3760726,13.7386248 11.3490868,13.7984446 11.3240598,13.8591612 L11.3518847,13.7938561 C11.3255639,13.8536635 11.3011632,13.9143938 11.2787443,13.9759543 L11.3240598,13.8591612 C11.1269914,14.337257 11.0513706,14.8709551 11.1277013,15.4145 L11.1572775,15.5883484 L11.3431146,16.516 L11.5391146,17.5 L12.1572775,20.5883484 C12.174149,20.672706 12.1944614,20.7556418 12.218051,20.8370215 C12.2306975,20.8806382 12.2442181,20.9236099 12.2586465,20.9661183 L12.218051,20.8370215 C12.23212,20.8855572 12.2473548,20.9335395 12.2637206,20.9809398 L12.2586465,20.9661183 C12.2765309,21.0188082 12.29581,21.0707863 12.3164367,21.1220137 L12.2637206,20.9809398 C12.6570487,22.1201393 13.7036435,22.9231783 14.9213539,22.9947874 L15.0990195,23 L16.9009805,23 C18.2027702,23 19.3398208,22.1635544 19.7448646,20.9557114 C19.766267,20.8918757 19.7855755,20.8271903 19.8027681,20.7615416 L19.8427225,20.5883484 L20.1597787,19 L20.1601146,18.999 L20.8427225,15.5883484 C20.8814664,15.3946289 20.9009805,15.197556 20.9009805,15 C20.9009805,14.6449598 20.8393054,14.3043246 20.7260846,13.9882237 L20.662995,13.8270049 L20.662995,13.8270049 Z M16,7 C14.3431458,7 13,8.34314575 13,10 L13.0040607,10.1213387 C13.0419936,10.1128428 13.0801209,10.1047602 13.1184388,10.0970966 C13.4413048,10.0325234 13.7697596,10 14.0990195,10 L17.9009805,10 C18.2771497,10 18.6436165,10.0415405 18.996044,10.1202845 L19,10 L19,10 C19,8.34314575 17.6568542,7 16,7 Z" fill="#00BA39" fill-rule="nonzero"></path>
    </g>
    <g id="icon-feature" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-1 -1) scale(0.85 0.85)">
        <circle id="bulb" stroke="#00BA39" stroke-width="2" cx="16" cy="13" r="8"></circle>
        <rect id="screw1" fill="#00BA39" x="13" y="23" width="6" height="2"></rect>
        <rect id="screw2" fill="#00BA39" x="13" y="26" width="6" height="2"></rect>
    </g>

    <!-- Containers to group SVG elements -->

    <!-- Component container -->
    <g id="component" data-template-type="node">
      <rect width="100" height="60" x="-50" y="-30" data-link-handles="edges"></rect>
      <text
        class="component-name text"
        data-content="title"
        data-click="title"
        dominant-baseline="middle"
        text-anchor="middle"
        data-width="90"
        data-height="38"
        text-overflow="hidden"
      ></text>
      <title data-content="title"></title>
    </g>

    <!-- ? container -->
    <clipPath id="clip1">
      <rect x="5" y="5" width="57" height="90" />
    </clipPath>

    <!-- Interface container (for interface provision edge) -->
    <g id="interface" data-template-type="node">
      <circle cx="0" cy="0" r="7"></circle>
      <text
        class="interface-name text"
        data-content="title"
        data-click="title"
        dominant-baseline="middle"
        text-anchor="middle"
        data-width="90"
        data-height="38"
        y="-20"
        text-overflow="hidden"
      ></text>
      <title data-content="title"></title>
    </g>

    <!-- Issue Group container -->
    <g id="issue-group-container" data-template-type="node">
      <rect class="background" x="-18" y="-14" width="36" height="28" data-link-handles="edges"></rect>
      <use href="#icon-folder" class="dropzone" stroke="black" fill="white" x="-19" y="-15"></use>
    </g>

    <!-- Unclassified container -->
    <g id="UNCLASSIFIED" data-template-type="node">
      <!-- first entry for link handle calculation only -->
      <rect class="background" x="-18" y="-14" width="36" height="28" data-link-handles="edges"></rect>
      <use href="#icon-folder" stroke="black" fill="white" x="-19" y="-15"></use>
      <use href="#icon-undecided" fill="black" x="-12" y="-11"></use>
      <rect class="badge-background" x="5" y="8" width="20" height="12" rx="6"></rect>
      <text class="text badge" data-content="issueCount" x="15" y="18" width="21"></text>
    </g>

    <!-- Feature Request container -->
    <g id="FEATURE_REQUEST" data-template-type="node">
      <rect class="background" x="-18" y="-14" width="36" height="28" data-link-handles="edges"></rect>
      <use href="#icon-folder" stroke="black" fill="white" x="-19" y="-15"></use>
      <use href="#icon-feature" fill="#005eff" x="-12" y="-11"></use>
      <rect class="badge-background" x="5" y="8" width="20" height="12" rx="6"></rect>
      <text class="text badge" data-content="issueCount" x="15" y="18" width="21"></text>
    </g>

    <!-- Bug container -->
    <g id="BUG" data-template-type="node">
      <rect class="background" x="-18" y="-14" width="36" height="28" data-link-handles="edges"></rect>
      <use href="#icon-folder" stroke="black" fill="white" x="-19" y="-15"></use>
      <use href="#icon-bug" fill="red" x="-12" y="-11"></use>
      <rect class="badge-background" x="5" y="8" width="20" height="12" rx="6"></rect>
      <text class="text badge" data-content="issueCount" x="15" y="18" width="21"></text>
    </g>

    <!-- Arrow container (for issue relation edge) -->
    <g id="arrow" data-template-type="marker" data-line-attachement-point="-9 0">
      <path d="M -9 -4 L 0 0 L -9 4 z" />
    </g>

    <!-- Interface (Consumption) Connector container (for interface consumption edge) -->
    <g id="interface-connector" data-template-type="marker" data-line-attachement-point="-1 0">
      <path d="M 7 -8 a8,8 0 0,0 0,16 l 0,1 a9,9 0 0,1 0,-18 z" />
    </g>

    <!--Interface (Provision) Connector container (for interface provision edge, before being created) -->
    <g id="interface-connector-initial" data-template-type="marker" data-line-attachement-point="-1 0">
      <text
        class="interface-name text"
        dominant-baseline="middle"
        text-anchor="middle"
        data-width="90"
        data-height="38"
        y="20"
        text-overflow="hidden"
        fill="red"
      >
        Create Interface / Connect
      </text>
    </g>
  </defs>
</svg>
</custom-graph-editor>`