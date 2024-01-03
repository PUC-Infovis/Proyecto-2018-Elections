const React = require('react');

const colLista = {'Chile Vamos': "red", 'Convergencia Democr�tica': "green", 'La Fuerza de la Mayor�a': "blue", 'Frente Amplio': "yellow"};

class EscanosGanados extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    const width=200,
          height=250;


    let c1 = (<circle cx={width/3} cy={height/4} r={15} x={25} fill={'#000'} />),
        c2 = (<circle cx={width * (2/3)} cy={height/4} r={15} x={25} fill={'#000'} />),
        c3 = (<circle cx={width/3} cy={height * (2/4)} r={15} x={25} fill={'#000'} />),
        c4 = (<circle cx={width * (2/3)} cy={height * (2/4)} r={15} x={25} fill={'#000'} />),
        c5 = (<circle cx={width/3} cy={height * (3/4)} r={15} x={25} fill={'#000'} />),
        c6 = (<circle cx={width * (2/3)} cy={height * (3/4)} r={15} x={25} fill={'#000'} />);

    let circles = [];
    let pos =[{x:width/3,y:height/4},{x:width *(2/3), y:height/4}, {x:width/3, y:height * (2/4)}, {x:width * (2/3), y:height * (2/4)}, {x:width/3, y:height * (3/4)}, {x:width * (2/3),y:height * (3/4)}];

    var i;
    for(i = 0; i < this.props.etapa; i++){
      circles[i] = (<circle cx={pos[i].x} cy={pos[i].y} r={15} x={25} fill={colLista[electo(i + 1,this.props.data).name]} />)
    }

    return (
      <div {...props}>
        <svg width={width} height={height} style={{ display: 'block', margin: '20px auto', background: '#ddd'}}>
            {circles}
        </svg>
      </div>
    );
  }
}

function electo(etapa, data){

  data.forEach( d => d.escanos = 0);
  var electo;
  var i;
  for (i = 0; i < etapa; i++) {
    let maxd = data.reduce((max,d) => votosActuales(max) > votosActuales(d) ? max : d);
    maxd.escanos += 1;
    electo = maxd;
  }

  return electo;
}

function votosActuales(partido){
  return partido.value / (partido.escanos + 1);
}

module.exports = EscanosGanados;
