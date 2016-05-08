'use strict'

const React = require('react');
const ps = require('../js/pubsub');
const howLongAgo = require('../js/how-long-ago');

module.exports = React.createClass({
  displayName: 'GithubReact',

  componentDidMount: function() {
    ps.subscribe('message-github', (data) => {
      this.setState(data);
    });
  },

  getInitialState: function() {
    if (typeof initialData === 'object' &&
        typeof initialData.github === 'object') {

      return initialData.github;
    }

    return this.props;
  },

  render: function() {
    let { repo, date } = this.state;
    let url = 'http://github.com/' + this.state.repo;

    return (
      <div>
        <svg className='icon icon-github recentList-item-icon' viewBox='0 0 58 45'>
          <path d='M57.925751,21.8379527 L57.9683277,21.6279077 C53.2636042,20.686963 48.4354084,20.6770285 45.5146479,20.7990816 C45.9943452,19.0704683 46.1391059,17.080718 46.1391059,14.8624728 C46.1391059,11.6805754 44.9441204,9.13590894 43.0026236,7.19866987 C43.3418179,6.10444912 43.7945499,3.67332052 42.5498916,0.560965003 C42.5498916,0.560965003 40.354354,-0.135873374 35.3884935,3.18794634 C33.4427391,2.70115293 31.3735123,2.46130428 29.3000279,2.46130428 C27.0193369,2.46130428 24.7130999,2.75224495 22.5643966,3.3412224 C17.4395832,-0.15432327 15.1773421,0.560965003 15.1773421,0.560965003 C13.7013505,4.25378263 14.6139107,6.98720568 14.8906591,7.66701338 C13.1549497,9.54038743 12.0962095,11.9317778 12.0962095,14.8624728 C12.0962095,17.0750411 12.3474119,19.0605337 12.9633546,20.7863086 C10.0170482,20.6784477 5.36483595,20.7210244 0.829,21.6279077 L0.87015746,21.8379527 C5.43437787,20.9253924 10.1163938,20.8941695 13.0442503,21.0048689 C13.1804957,21.362513 13.3309333,21.7088034 13.4998208,22.04374 C10.6046064,22.1374087 5.66003429,22.5064066 0.922668702,23.8433144 L0.980856836,24.0491017 C5.75654143,22.7022593 10.7436902,22.343196 13.6105202,22.2552042 C15.3405528,25.4796783 18.7509451,27.5630973 24.8195416,28.217359 C23.9580734,28.7964019 23.0795745,29.7799233 22.7233496,31.4446716 C21.5496523,32.0066838 17.8341272,33.3762337 15.6059474,29.5429131 C15.6059474,29.5429131 14.3584506,27.2622221 11.9698987,27.0834 C11.9698987,27.0834 9.65372714,27.0479194 11.8095265,28.5267496 C11.8095265,28.5267496 13.3593178,29.2576493 14.4294117,32.0024261 C14.4294117,32.0024261 15.8245077,36.684442 22.5573005,35.1814851 L22.5573005,40.0181963 C22.5573005,40.0181963 22.4153782,41.7283597 20.8471371,42.2988872 C20.8471371,42.2988872 19.9203846,42.9403759 20.9195174,43.2966009 C20.9195174,43.2966009 25.2665968,43.6528258 25.2665968,40.0905766 L25.2665968,34.8167448 C25.2665968,34.8167448 25.0948708,32.7248105 26.1209689,31.9981684 L26.1209689,40.659685 C26.1209689,40.659685 26.0500077,42.7260733 24.981333,43.5109035 C24.981333,43.5109035 24.2688832,44.7938809 25.8357051,44.437656 C25.8357051,44.437656 28.8288459,44.0104699 28.9721874,40.5177627 L29.0403101,31.7512237 L29.759856,31.7512237 L29.8279787,40.5177627 C29.969901,44.0104699 32.964461,44.437656 32.964461,44.437656 C34.531283,44.7938809 33.8188331,43.5109035 33.8188331,43.5109035 C32.7501584,42.7274925 32.6791973,40.659685 32.6791973,40.659685 L32.6791973,32.071968 C33.7067145,32.8709904 33.5335694,34.8153256 33.5335694,34.8153256 L33.5335694,40.0891574 C33.5335694,43.6528258 37.8806487,43.2951816 37.8806487,43.2951816 C38.8783623,42.9389567 37.953029,42.297468 37.953029,42.297468 C36.3847879,41.7269405 36.2414464,40.016777 36.2414464,40.016777 L36.2414464,33.103743 C36.2414464,30.4086389 35.1060682,28.9809008 33.996236,28.2272936 C40.4664726,27.5858049 43.5731512,25.496709 45.0037277,22.2495273 C47.8379156,22.3275845 52.9386022,22.6724557 57.8178901,24.0491017 L57.8760782,23.8433144 C53.0251748,22.4751837 47.9571303,22.120378 45.094558,22.0380631 C45.2308034,21.7102226 45.3485989,21.3696092 45.4536213,21.0176419 C48.3601896,20.897008 53.211093,20.8984272 57.9342663,21.8422103 L57.9271702,21.8393719 L57.925751,21.8379527 Z M14.6068146,29.6110357 C14.3513545,29.6110357 14.1427287,29.4676942 14.1427287,29.2902914 C14.1427287,29.1128886 14.3499353,28.9695471 14.6068146,28.9695471 C14.8622747,28.9695471 15.0694812,29.1128886 15.0709004,29.2902914 C15.0723197,29.4676942 14.8636939,29.6110357 14.6068146,29.6110357 L14.6068146,29.6110357 Z M15.3192644,30.6797105 C15.0638043,30.6797105 14.8551786,30.536369 14.8551786,30.3589661 C14.8551786,30.1815633 15.0623851,30.0382218 15.3192644,30.0382218 C15.5747245,30.0382218 15.781931,30.1815633 15.7833503,30.3589661 C15.7847695,30.536369 15.5761437,30.6782913 15.3192644,30.6782913 L15.3192644,30.6797105 Z M13.0016736,27.6510891 C13.0016736,27.828492 12.7944671,27.9718335 12.539007,27.9718335 C12.2835469,27.9718335 12.0749212,27.828492 12.0749212,27.6510891 C12.0749212,27.4736863 12.2821277,27.3303448 12.539007,27.3303448 C12.7958863,27.3303448 13.0016736,27.4736863 13.0016736,27.6510891 L13.0016736,27.6510891 Z M13.8219844,28.6828641 C13.5665243,28.6828641 13.3578986,28.5395226 13.3578986,28.3621197 C13.3578986,28.1847169 13.5651051,28.0413754 13.8219844,28.0413754 C14.0774445,28.0413754 14.284651,28.1847169 14.284651,28.3621197 C14.284651,28.5395226 14.0774445,28.6814448 13.8219844,28.6814448 L13.8219844,28.6828641 Z M17.635436,32.2110518 C17.635436,32.3884547 17.4282294,32.5317962 17.1713501,32.5317962 C16.9144708,32.5317962 16.7072643,32.3884547 16.7072643,32.2110518 C16.7072643,32.033649 16.9144708,31.8903075 17.1713501,31.8903075 C17.4268102,31.8903075 17.6340167,32.033649 17.635436,32.2110518 L17.635436,32.2110518 Z M16.565342,31.3566797 C16.565342,31.5340826 16.3581355,31.6774241 16.1012562,31.6774241 C15.8443768,31.6774241 15.6371703,31.5340826 15.6371703,31.3566797 C15.6371703,31.1792769 15.8443768,31.0359354 16.1012562,31.0359354 C16.3581355,31.0359354 16.5639228,31.1792769 16.565342,31.3566797 L16.565342,31.3566797 Z M20.6228999,32.7829986 C20.6228999,32.9604015 20.4156934,33.103743 20.158814,33.103743 C19.9019347,33.103743 19.6947282,32.9604015 19.6947282,32.7829986 C19.6947282,32.6055958 19.9019347,32.4622543 20.158814,32.4622543 C20.4156934,32.4622543 20.6214807,32.6055958 20.6228999,32.7829986 L20.6228999,32.7829986 Z M22.1343721,32.5346346 C22.1343721,32.7120375 21.9271656,32.8539598 21.6702863,32.8539598 C21.413407,32.8539598 21.2062004,32.7106183 21.2062004,32.5332154 C21.2062004,32.3558126 21.413407,32.2124711 21.6702863,32.2124711 C21.9271656,32.2124711 22.1329529,32.3558126 22.1343721,32.5332154 L22.1343721,32.5346346 Z M19.132716,32.7829986 C19.132716,32.9604015 18.9255095,33.103743 18.6686301,33.103743 C18.4117508,33.103743 18.2045443,32.9604015 18.2045443,32.7829986 C18.2045443,32.6055958 18.4117508,32.4622543 18.6686301,32.4622543 C18.9255095,32.4622543 19.1312968,32.6055958 19.132716,32.7829986 L19.132716,32.7829986 Z M42.017683,19.1428486 C42.017683,26.8137477 36.2996345,27.0209542 29.2460974,27.0209542 C22.1925603,27.0209542 16.4745117,25.9593756 16.4745117,19.1428486 C16.4745117,17.5107425 17.2777918,15.9950126 18.6544379,14.7375812 C20.9507403,12.6413892 24.8365723,13.7512214 29.2460974,13.7512214 C33.6357534,13.7512214 37.5073931,12.6300354 39.8079532,14.710616 L39.8079532,14.710616 C41.2016299,15.9737242 42.0162638,17.4979695 42.0162638,19.1414294 L42.017683,19.1428486 Z M24.14683,19.5813885 C24.14683,20.9892575 23.3520653,22.1317318 22.37564,22.1317318 C21.3992147,22.1317318 20.60445,20.9906767 20.60445,19.5813885 C20.60445,18.1721003 21.3977955,17.0310452 22.37564,17.0310452 C23.3534845,17.0310452 24.14683,18.1721003 24.14683,19.5813885 L24.14683,19.5813885 L24.14683,19.5813885 Z M38.4029227,19.5813885 C38.4029227,20.9892575 37.6095771,22.1317318 36.6317327,22.1317318 C35.6538882,22.1317318 34.8605426,20.9906767 34.8605426,19.5813885 C34.8605426,18.1721003 35.6538882,17.0310452 36.6317327,17.0310452 C37.6095771,17.0310452 38.4029227,18.1721003 38.4029227,19.5813885 L38.4029227,19.5813885 L38.4029227,19.5813885 Z M29.9514511,22.9307542 C29.9514511,23.2983329 29.6534143,23.5949505 29.2872548,23.5949505 C28.9210954,23.5949505 28.6230586,23.2969137 28.6230586,22.9307542 C28.6230586,22.5631755 28.9210954,22.2665579 29.2872548,22.2665579 C29.6534143,22.2665579 29.9514511,22.5645947 29.9514511,22.9307542 L29.9514511,22.9307542 Z M27.7360444,24.611114 C27.6963061,24.5004146 27.7559135,24.3783614 27.8666129,24.3386232 C27.9773122,24.2988849 28.0993654,24.3584923 28.1391036,24.4691917 C28.3108296,24.9517274 28.7678193,25.2767294 29.2787395,25.2767294 C29.7896597,25.2767294 30.2480687,24.9531466 30.4183754,24.4691917 C30.4581136,24.3584923 30.5787476,24.3003042 30.6908662,24.3386232 C30.8029848,24.3769422 30.8597537,24.4989954 30.8214347,24.611114 C30.5901013,25.2639564 29.969901,25.7024963 29.2787395,25.7024963 C28.587578,25.7024963 27.9687969,25.2667949 27.7374636,24.6125332 L27.7374636,24.611114 L27.7360444,24.611114 Z M11.3000255,28.6019684 L10.8373589,30.2156246 C10.8373589,30.2156246 10.716725,30.7989252 11.2659642,30.9025285 C11.8393302,30.8911747 11.7924958,30.3547085 11.7527576,30.1801441 L11.3000255,28.6019684 L11.3000255,28.6019684 Z'></path>
        </svg>

        <h1 className='recentList-item-heading'>What I’m Working On</h1>
        <a className='recentList-item-primaryLink recentList-item-externalLink' data-category='github' href='//github.com/robtarr'>
          github.com
        </a>
        <article>
          <div className='recentList-item-detail'>
            <p>
              Pushed code to <a href={ url }>{ repo }</a>
              <span className='meta'>
                { howLongAgo(date) }
              </span>
            </p>
          </div>
        </article>
      </div>)
  },
})
