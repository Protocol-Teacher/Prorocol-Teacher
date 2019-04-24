//Description: This is main function
//Parameters: nothing.
//Return: nothing.
$(document).ready(function () {
  buildTable(ether);
});



function popOver() {
  $('[data-toggle="popover"]').popover();
};

function clearPopOver() {
  $('.popover').remove();
};

function updateBread(bread) {
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

function links(protcol) {
  let wiki;
  let rfc;
  let prt = protcol;

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

function bytes() {
  let inner = '<div class="row">' +
    '<div class="col-1" id="length">1</div>' +
    '<div class="col-10" id="length">16</div>' +
    '<div class="col-1" id="length">31</div>' +
    '</div>';
  document.getElementById("bytes").innerHTML = inner;
}

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

let breads = [];

let ether = [
  [
    {
      name: "Preamble",
      size: "-2",
      id: "staticBox",
      data: "This offers synchronization since both sender and receiver interface cards are running with different system clocks.",
      placement: "bottom"
    },
    {
      name: "Destination Address",
      size: "-2",
      id: "staticBox",
      data: "The Media Access Control (MAC) address where this frame is supposed to go.",
      placement: "bottom"
    },
    {
      name: "Source Address",
      size: "-2",
      id: "staticBox",
      data: "The MAC address of the sending device.",
      placement: "bottom"
    },
    {
      name: "Type",
      size: "-1",
      id: "staticBox",
      data: "Sets the kind of packet that is in the data field. Its also called Ether Type.",
      placement: "bottom"
    },
    {
      name: "Payload (Body)",
      size: "-4 dropdown",
      id: "selectBoxData",
      data: "The minimum payload is 42 octets when an 802.1Q tag is present and 46 octets when absent. When the actual payload is less, padding bytes are added accordingly. The maximum payload is 1500 octets. Non-standard jumbo frames allow for larger maximum payload size.",
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
      name: "CRS",
      size: "-1",
      id: "staticBox",
      data: "Frame check sequence it refers to an error-detecting code added to a frame in a communications protocol.",
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
      data: "The first header field in an IP packet is the four-bit version field. For IPv4, this is always equal to 4.",
      placement: "bottom"
    },
    {
      name: "HLen",
      size: "-2",
      id: "staticBox",
      data: "The Internet Header Length (IHL) field has 4 bits, which is the number of 32-bit words. Since an IPv4 header may contain a variable number of options, this field specifies the size of the header (this also coincides with the offset to the data).",
      placement: "bottom"
    },
    {
      name: "TOS",
      size: "-2",
      id: "staticBox",
      data: "The type of service (ToS) field is the second byte of the IPv4 header. It has had various purposes over the years, and has been defined in different ways by five RFCs.",
      placement: "bottom"
    },
    {
      name: "Length",
      size: "-6",
      id: "staticBox",
      data: "This 16-bit field defines the entire packet size in bytes, including header and data. The minimum size is 20 bytes.",
      placement: "bottom"
    },
  ],
  [
    {
      name: "Ident",
      size: "-6",
      id: "staticBox",
      data: "This field is an identification field and is primarily used for uniquely identifying the group of fragments of a single IP datagram.",
      placement: "bottom"
    },
    {
      name: "Flags",
      size: "-2",
      id: "staticBox",
      data: "A three-bit field follows and is used to control or identify fragments.",
      placement: "bottom"
    },
    {
      name: "Offset",
      size: "-4",
      id: "staticBox",
      data: "The fragment offset field is measured in units of eight-byte blocks. It is 13 bits long and specifies the offset of a particular fragment relative to the beginning of the original unfragmented IP datagram.",
      placement: "bottom"
    },
  ]
  ,
  [
    {
      name: "TTL",
      size: "-4",
      id: "staticBox",
      data: "An eight-bit time to live field helps prevent datagrams from persisting (e.g. going in circles) on an internet.",
      placement: "bottom"
    },
    {
      name: "Protocol",
      size: "-2",
      id: "staticBox",
      data: "This field defines the protocol used in the data portion of the IP datagram.",
      placement: "bottom"
    },
    {
      name: "Checksum",
      size: "-6",
      id: "staticBox",
      data: "The 16-bit IPv4 header checksum field is used for error-checking of the header.",
      placement: "bottom"
    },
  ],
  [
    {
      name: "SourceAddr",
      size: "",
      id: "staticBox",
      data: "This field is the IPv4 address of the sender of the packet.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "DestinationAddr",
      size: "",
      id: "staticBox",
      data: "This field is the IPv4 address of the receiver of the packet.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Options (variable)",
      size: "-9",
      id: "staticBox",
      data: "The options field is not often used.",
      placement: "bottom"
    },
    {
      name: "Pad (variable)",
      size: "-3",
      id: "staticBox",
      data: "Any padding needed to ensure that the header contains an integer number of 32-bit words.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Data",
      size: " dropdown",
      id: "selectBoxData",
      data: "The packet payload is not included in the checksum. Its contents are interpreted based on the value of the Protocol header field.",
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
      data: "Identifies the sending port.",
      placement: "bottom"
    },
    {
      name: "DstPort",
      size: "-6",
      id: "staticBox",
      data: "Identifies the receiving port.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "SequenceNum",
      size: "",
      id: "staticBox",
      data: "Has a dual role: If the SYN flag is set (1), then this is the initial sequence number. The sequence number of the actual first data byte and the acknowledged number in the corresponding ACK are then this sequence number plus 1. If the SYN flag is clear (0), then this is the accumulated sequence number of the first data byte of this segment for the current session.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Acknowledgment",
      size: "",
      id: "staticBox",
      data: "If the ACK flag is set then the value of this field is the next sequence number that the sender of the ACK is expecting.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "HdrLen",
      size: "-2",
      id: "staticBox",
      data: "A HdrLen field is included that gives the length of the header in 32-bit words.",
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
      data: "Contains 9 1-bit flags.",
      placement: "bottom"
    },
    {
      name: "AdvertisedWindow",
      size: "-6",
      id: "staticBox",
      data: "The size of the receive window, which specifies the number of window size units that the sender of this segment is currently willing to receive.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Checksum",
      size: "-6",
      id: "staticBox",
      data: "The 16-bit checksum field is used for error-checking of the header, the Payload and a Pseudo-Header.",
      placement: "bottom"
    },
    {
      name: "UrgPtr",
      size: "-6",
      id: "staticBox",
      data: "if the URG flag is set, then this 16-bit field is an offset from the sequence number indicating the last urgent data byte.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Options (variable)",
      size: "",
      id: "staticBox",
      data: "The length of this field is determined by the data offset field.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Data",
      size: "",
      id: "staticBoxData",
      data: "",
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
      data: "",
      placement: "bottom"
    },
    {
      name: "Code",
      size: "-3",
      id: "staticBox",
      data: "",
      placement: "bottom"
    },
    {
      name: "Checksum",
      size: "-6",
      id: "staticBox",
      data: "",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Identifier",
      size: "-6",
      id: "staticBox",
      data: "",
      placement: "bottom"
    },
    {
      name: "Sequence Number",
      size: "-6",
      id: "staticBox",
      data: "",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Optional Data",
      size: "",
      id: "staticBoxData",
      data: "",
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
      data: "Identifies the sending port.",
      placement: "bottom"
    },
    {
      name: "Destination Port",
      size: "",
      id: "staticBox",
      data: "Identifies the receiving port.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Length",
      size: "",
      id: "staticBox",
      data: "This field that specifies the length in bytes of the UDP header and UDP data.",
      placement: "bottom"
    },
    {
      name: "Checksum",
      size: "",
      id: "staticBox",
      data: "The checksum field may be used for error-checking of the header and data.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "Data",
      size: "",
      id: "staticBoxData",
      data: "",
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
      data: "The constant 6 (bit sequence 0110).",
      placement: "bottom"
    },
    {
      name: "TrafficClass",
      size: "-3",
      id: "staticBox",
      data: "The bits of this field hold two values. The six most-significant bits hold the Differentiated Services (DS) field, which is used to classify packets. Currently, all standard DS fields end with a '0' bit. Any DS field that ends with two '1' bits is intended for local or experimental use. The remaining two bits are used for Explicit Congestion Notification (ECN).",
      placement: "bottom"
    },
    {
      name: "FlowLabel",
      size: "",
      id: "staticBox",
      data: "Originally created for giving real-time applications special service. When set to a non-zero value, it serves as a hint to routers and switches with multiple outbound paths that these packets should stay on the same path.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "PayloadLen",
      size: "-6",
      id: "staticBox",
      data: "The size of the payload in octets, including any extension headers.",
      placement: "bottom"
    },
    {
      name: "NextHeader",
      size: "-3",
      id: "staticBox",
      data: "Specifies the type of the next header. This field usually specifies the transport layer protocol used by a packet's payload.",
      placement: "bottom"
    },
    {
      name: "HopeLimit",
      size: "",
      id: "staticBox",
      data: "Replaces the time to live field of IPv4.",
      placement: "bottom"
    }
  ],
  [
    {
      name: "SourceAddress",
      size: "",
      id: "staticBox",
      data: "The IPv6 address of the sending node.",
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
      data: "The IPv6 address of the destination node(s).",
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
      data: "",
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
