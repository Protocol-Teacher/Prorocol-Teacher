//Description: This is main function
//Parameters: nothing.
//Return: nothing.
$(document).ready(function () {
  buildTable(ether);
});

//Description: Enable Popovers
//Parameters: nothing.
//Return: nothing.
function popOver() {
  $('[data-toggle="popover"]').popover();
};

//Description: Clear All Popovers
//Parameters: nothing.
//Return: nothing.
function clearPopOver() {
  $('.popover').remove();
};

//Description: Populate and update the bread to show the stack of protocols.
//Parameters: Protocol.
//Return: nothing.
function updateBread(bread) {
  //Add protocol
  var arrayLength = breads.length;
  if(breads.arrayLength == 0){
    breads.push(bread);
  } else {
    for (var i = 0; i < arrayLength; i++) {
      if (breads.includes(bread)){
        breads.pop();
      }
      else {
        break;
      }
    }
    breads.push(bread);  
  }
  //build the stack 
  let inner = '<ol class="breadcrumb">';
  arrayLength = breads.length;
  for (var i = 0; i < arrayLength; i++) {

    if(i == 0){
      inner += '<li class="active" id="bread"><button type="button" class="btn btn-secondary ' +
      'btn-lg btn-block" onclick="buildTable(ether)"><h4 class="text-center mb-0">Ethernet II</h2></button></li>';
    } else {
      inner += '<li class="active" id="bread"><button type="button" class="btn btn-secondary ' +
      'btn-lg btn-block" onclick="buildTable('+ breads[i] +')"><h4 class="text-center mb-0">'+ breads[i] +'</h2></button></li>';
    }
    if(i != arrayLength -1){
      inner += '<h2> &#10144 </h2>';
    }
  } 
  inner += '</ol> <br>';
  document.getElementById("bread").innerHTML = inner;
}

//Description: Add links to the bottom of the table
//Parameters: Protocol.
//Return: nothing.
function links(protcol) {
  let wiki;
  let rfc;
  let prt = protcol;
  //list of links for each protocol
  if(protcol == "IPv4"){
    wiki = "'https://en.wikipedia.org/wiki/IPv4'";
    rfc = "'https://www.rfc-editor.org/rfc/pdfrfc/rfc791.txt.pdf'";
  } else if (protcol == "IPv6") {
    wiki = "'https://en.wikipedia.org/wiki/IPv6_packet'";
    rfc = "'https://www.rfc-editor.org/rfc/pdfrfc/rfc2460.txt.pdf'";
  } else if (protcol == "TCP") {
    wiki = "'https://en.wikipedia.org/wiki/Transmission_Control_Protocol'";
    rfc = "'https://www.rfc-editor.org/rfc/pdfrfc/rfc793.txt.pdf'";
  } else if (protcol == "UDP") {
    wiki = "'https://en.wikipedia.org/wiki/User_Datagram_Protocol'";
    rfc = "'https://www.rfc-editor.org/rfc/pdfrfc/rfc768.txt.pdf'";
  } else if (protcol == "ICMP") {
    wiki = "'https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol'";
    rfc = "'https://www.rfc-editor.org/rfc/pdfrfc/rfc792.txt.pdf'";
  } else if (protcol == "Ethernet II") {
    wiki = "'https://en.wikipedia.org/wiki/Ethernet_frame#Ethernet_II'";
  }
  wiki += ",'_blank'";
  //build the links
  let inner = '<div class="row">' +
    '<div class="col-5" id="length">' +
    '<h6 class="mb-0 text-white">For More Information About ' + prt + ' Visit:</h6>' +
    '</div></div>' +
    '<div class="row">' +
    '<div class="col-2" id="length">' +
    '<button type="button" class="btn btn-secondary ' +
    'btn-lg btn-block" onclick="window.open(' + wiki + ')"><h6 class="text-center mb-0">Wikipedia</h2></button>' +
    '</div>';
  if (protcol != "Ethernet II"){
    inner += '<div class="col-2" id="length">' +
    '<button type="button" class="btn btn-secondary ' +
    'btn-lg btn-block" onclick="window.open(' + rfc + ')"><h6 class="text-center mb-0">RFC</h2></button>' +
    '</div>';
  }
  inner += '</div>';
  document.getElementById("links").innerHTML = inner;
}

//Description: Show the bytes on top of the table
//Parameters: nothing.
//Return: nothing.
function bytes() {
  let inner = '<div class="row">' +
    '<div class="col-1" id="length">1</div>' +
    '<div class="col-10" id="length">16</div>' +
    '<div class="col-1" id="length">31</div>' +
    '</div>';
  document.getElementById("bytes").innerHTML = inner;
}

//Description: The main method to bulid the protocol table
//Parameters: Protocol.
//Return: nothing.
function buildTable(protcol) {
  if(protcol == IPv4){
    updateBread("IPv4");
    links("IPv4");
  } else if (protcol == IPv6) {
    updateBread("IPv6");
    links("IPv6");
  } else if (protcol == TCP) {
    updateBread("TCP");
    links("TCP");
  } else if (protcol == UDP) {
    updateBread("UDP");
    links("UDP");
  } else if (protcol == ICMP) {
    updateBread("ICMP");
    links("ICMP");
  } else if (protcol == ether) {
    updateBread("Ethernet II");
    links("Ethernet II");
  }

  let obj = protcol;
  let inner = '';
  Object.keys(obj).forEach(function(row) {
    inner += '<div class="row">';
    Object.keys(obj[row]).forEach(function(key) {
      
      inner += '<div class="col' + obj[row][key].size +'" id="' + obj[row][key].id  +'"' +
      'title="'+ obj[row][key].name +'" data-toggle="popover" data-placement="'+ obj[row][key].placement  +'" ' +
      'data-trigger="hover" data-content="'+ obj[row][key].data +'">' +
       obj[row][key].name;
      '</div>';

      if(obj[row][key].id == "selectBoxData"){
        inner +='<div class="dropdown-content">';
        Object.keys(obj[row][key].list).forEach(function(prct) {
          inner += '<button onclick="buildTable('+
          obj[row][key].list[prct].protcol +')">'+
           obj[row][key].list[prct].protcol +'</button>';
        });
        inner += '</div>';
      }

      inner += '</div>';
    });
    inner += '</div>';
  });
  clearPopOver();
  document.getElementById("table").innerHTML = inner;
  popOver();
  bytes();
};

//---------Data-----------

let breads = [];

let ether = [
  [
    {
      name: "Preamble",
      size: "-2",
      id: "staticBox",
      data: "Preamble helps with synchronization between both the sender and receiver.",
      placement: "bottom"
    },
    {
      name: "Destination Address",
      size: "-2",
      id: "staticBox",
      data: "The MAC address of the receiving node.",
      placement: "bottom"
    },
    {
      name: "Source Address",
      size: "-2",
      id: "staticBox",
      data: "The MAC address of the sending node.",
      placement: "bottom"
    },
    {
      name: "Type",
      size: "-1",
      id: "staticBox",
      data: "Includes the type of packet in its data field.",
      placement: "bottom"
    },
    {
      name: "Payload (Body)",
      size: "-4 dropdown",
      id: "selectBoxData",
      data: "A maximum payload of 1500 octets.",
      placement: "top",
      list: [
        {
          protcol: "IPv4"
        },
        {
          protcol: "IPv6"
        }
      ]
    },
    {
      name: "CRC",
      size: "-1",
      id: "staticBox",
      data: "Cyclic Redundancy Check helps with error detecting.",
      placement: "bottom"
    }
  ]
];

let IPv4 = [
  [
    {
      name: "Version",
      size: "-2",
      id: "staticBox",
      data: "This includes a four-bit version field, it is always set to 4.",
      placement: "bottom"
    },
    {
      name: "HLen",
      size: "-2",
      id: "staticBox",
      data: "Internet Header Length includes the size of the header in four bits.",
      placement: "bottom"
    },
    {
      name: "TOS",
      size: "-2",
      id: "staticBox",
      data: "The Type of Service is used to request a low delay route and priority.",
      placement: "bottom"
    },
    {
      name: "Length",
      size: "-6",
      id: "staticBox",
      data: "This includes the size of the packet including the header. Maximum size is 65,535 bytes and minimum size is 20 bytes.",
      placement: "bottom"
    },
  ],
  [
    {
      name: "Ident",
      size: "-6",
      id: "staticBox",
      data: "This identifies the fragments of an IP datagram.",
      placement: "bottom"
    },
    {
      name: "Flags",
      size: "-2",
      id: "staticBox",
      data: "This is used to identify fragments. If the second bit is set then the packet will not be fragmented, and it will be dropped if it can not be routed without fragmentation. If the third bit is set then more fragments are expected, if not set then it will be the last fragment.",
      placement: "bottom"
    },
    {
      name: "Offset",
      size: "-4",
      id: "staticBox",
      data: "This is used to place the fragmented packet in the correct position within the entire unfragmented packet. The value is multiplied by 8 which gives the maximum size of 212 × 8 = 65,528 bytes.",
      placement: "bottom"
    },
  ]
  ,
  [
    {
      name: "TTL",
      size: "-4",
      id: "staticBox",
      data: "Time to Live helps prevent packets from circling the internet indefinitely. It also helps with counting hops since every time a packet reaches a router the TTL is decreased until it reaches zero then the packet gets dropped.",
      placement: "bottom"
    },
    {
      name: "Protocol",
      size: "-2",
      id: "staticBox",
      data: "This includes the protocol carried in the data section of the IPv4 packet.",
      placement: "bottom"
    },
    {
      name: "Checksum",
      size: "-6",
      id: "staticBox",
      data: "Checksum is used for error checking.",
      placement: "bottom"
    },
  ],
  [
    {
      name: "SourceAddr",
      size: "",
      id: "staticBox",
      data: "Includes the IPv4 address of the source node.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "DestinationAddr",
      size: "",
      id: "staticBox",
      data: "Includes the IPv4 address of the destination node.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Options (variable)",
      size: "-9",
      id: "staticBox",
      data: "This field is not usually used.",
      placement: "bottom"
    },
    {
      name: "Pad (variable)",
      size: "-3",
      id: "staticBox",
      data: "This is used to ensure that the packet length is a multiple of 32 bits.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Payload",
      size: " dropdown",
      id: "selectBoxData",
      data: "This includes the data carried in the IPv4 packet.",
      placement: "top",
      list: [
        {
          protcol: "TCP",
        },
        {
          protcol: "UDP",
        }
        ,
        {
          protcol: "ICMP",
        }
      ]
    }
  ]
];

let TCP = [
  [
    {
      name: "SrcPort",
      size: "-6",
      id: "staticBox",
      data: "Includes the sending port.",
      placement: "bottom"
    },
    {
      name: "DstPort",
      size: "-6",
      id: "staticBox",
      data: "Includes the receiving port.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "SequenceNum",
      size: "",
      id: "staticBox",
      data: "This includes two main functionalities. When the SYN flag is set then it will include the initial sequence number. When the SYN flag is not set then it will include the accumulated sequence number.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Acknowledgment",
      size: "",
      id: "staticBox",
      data: "When the ACK flag is set this will include the next sequence number.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "HdrLen",
      size: "-2",
      id: "staticBox",
      data: "This includes the length of the header.",
      placement: "bottom"
    },
    {
      name: "0",
      size: "-2",
      id: "staticBox",
      data: "",
      placement: "bottom"
    },
    {
      name: "Flags",
      size: "-2",
      id: "staticBox",
      data: "This includes 9 1-bit flags.",
      placement: "bottom"
    },
    {
      name: "AdvertisedWindow",
      size: "-6",
      id: "staticBox",
      data: "This includes the receive window size.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Checksum",
      size: "-6",
      id: "staticBox",
      data: "Checksum is used for error checking.",
      placement: "bottom"
    },
    {
      name: "UrgPtr",
      size: "-6",
      id: "staticBox",
      data: "When URG flag is set then this will include an offset from the sequence number.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Options (variable)",
      size: "",
      id: "staticBox",
      data: "This includes; Option-Kind, Option-Length, and Option-Data.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Data",
      size: "",
      id: "staticBoxData",
      data: "This includes the data carried in the packet.",
      placement: "bottom"
    }
  ]
];

let ICMP = [
  [
    {
      name: "Type",
      size: "-3",
      id: "staticBox",
      data: "Includes the ICMP type.",
      placement: "bottom"
    },
    {
      name: "Code",
      size: "-3",
      id: "staticBox",
      data: "Includes the ICMP subtype.",
      placement: "bottom"
    },
    {
      name: "Checksum",
      size: "-6",
      id: "staticBox",
      data: "Checksum is used for error checking.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Identifier",
      size: "-6",
      id: "staticBox",
      data: "Used with a timestamp request.",
      placement: "bottom"
    },
    {
      name: "Sequence Number",
      size: "-6",
      id: "staticBox",
      data: "Used with a timestamp request.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Optional Data",
      size: "",
      id: "staticBoxData",
      data: "Includes a copy of the IP header, and the first 8 bytes of the data.",
      placement: "bottom"
    }
  ]
]

let UDP = [
  [
    {
      name: "Source Port",
      size: "",
      id: "staticBox",
      data: "Includes the sending port.",
      placement: "bottom"
    },
    {
      name: "Destination Port",
      size: "",
      id: "staticBox",
      data: "Includes the receiving port.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Length",
      size: "",
      id: "staticBox",
      data: "This includes the length of the header.",
      placement: "bottom"
    },
    {
      name: "Checksum",
      size: "",
      id: "staticBox",
      data: "Checksum is used for error checking.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Data",
      size: "",
      id: "staticBoxData",
      data: "This includes the data carried in the packet.",
      placement: "bottom"
    }
  ]
]


let IPv6 = [
  [
    {
      name: "Version",
      size: "-2",
      id: "staticBox",
      data: "Include a constant value of 6.",
      placement: "bottom"
    },
    {
      name: "TrafficClass",
      size: "-3",
      id: "staticBox",
      data: "This includes two main functionalities. The first 6 bits are called Differentiated Services, it is used to classify packets. The last 2 bits are called Explicit Congestion Notification, it is used for congestion control.",
      placement: "bottom"
    },
    {
      name: "FlowLabel",
      size: "",
      id: "staticBox",
      data: "This is used to make sure that the packet stays on the same path when set to non-zero.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "PayloadLen",
      size: "-6",
      id: "staticBox",
      data: "This includes the size of the payload carried in octets.",
      placement: "bottom"
    },
    {
      name: "NextHeader",
      size: "-3",
      id: "staticBox",
      data: "This includes the protocol carried in the payload section of the IPv6 packet.",
      placement: "bottom"
    },
    {
      name: "HopeLimit",
      size: "",
      id: "staticBox",
      data: "Hope Limit prevent packets from circling the internet indefinitely. It also helps with counting hops since every time a packet reaches a router the HopeLimit is decreased until it reaches zero then the packet gets dropped.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "SourceAddress",
      size: "",
      id: "staticBox",
      data: "Includes the IPv6 address of the source node.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "",
      size: "",
      id: "staticBox",
      data: "",
      placement: "bottom"
    }
  ],
  [
    {
      name: "",
      size: "",
      id: "staticBox",
      data: "",
      placement: "bottom"
    }
  ],
  [
    {
      name: "",
      size: "",
      id: "staticBox",
      data: "",
      placement: "bottom"
    }
  ],
  [
    {
      name: "DestinationAddress",
      size: "",
      id: "staticBox",
      data: "Includes the IPv6 address of the source node.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "",
      size: "",
      id: "staticBox",
      data: "",
      placement: "bottom"
    }
  ],
  [
    {
      name: "",
      size: "",
      id: "staticBox",
      data: "",
      placement: "bottom"
    }
  ],
  [
    {
      name: "",
      size: "",
      id: "staticBox",
      data: "",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Next Header/Data",
      size: " dropdown",
      id: "selectBoxData",
      data: "This includes the data carried in the IPv6 packet.",
      placement: "top",
      list: [
        {
          protcol: "TCP",
        },
        {
          protcol: "UDP",
        }
        ,
        {
          protcol: "ICMP",
        }
      ]
    }
  ]
]
