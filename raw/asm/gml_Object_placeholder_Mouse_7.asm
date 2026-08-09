// gml_Object_placeholder_Mouse_7  locals=2 args=0 len=4696
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 1
00000018: conv.i.v
0000001C: push.imm.e -1
00000020: push.imm.e 0
00000024: push.v obj0.view_yview[array]
0000002C: push.imm.e -1
00000030: push.imm.e 0
00000034: push.v obj0.view_hview[array]
0000003C: add.v.v
00000040: push.imm.e 100
00000044: sub.i.v
00000048: push.builtin.v mouse_y
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x21DD32C
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: push.v act
00000088: call action_if_variable(argc=3)
00000090: pop.v.v local.__b__
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x21DD32C
000000A8: push.imm.e 1
000000AC: conv.i.v
000000B0: push.imm.e 16
000000B4: conv.i.v
000000B8: push.v scrolling
000000C0: call action_if_variable(argc=3)
000000C8: pop.v.v local.__b__
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x21DD32C
000000E0: push.imm.e 156
000000E4: pushenv 0x21DC20C
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: push.v selec
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x21DC20C
00000120: b 0x21DC214
00000124: popenv 0x41DC1D0
00000128: b 0x21DC218
0000012C: popenv 0x1DDC214
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x21DC300
00000140: push.imm.e 156
00000144: pushenv 0x21DC26C
00000148: push.imm.e 4
0000014C: conv.i.v
00000150: push.imm.e 100
00000154: conv.i.v
00000158: push.v mon
00000160: call action_if_variable(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x21DC26C
00000180: b 0x21DC274
00000184: popenv 0x41DC230
00000188: b 0x21DC278
0000018C: popenv 0x1DDC274
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x21DC300
000001A0: push.imm.e 680
000001A4: conv.i.v
000001A8: push.imm.e -1559
000001AC: conv.i.v
000001B0: push.imm.e 122
000001B4: conv.i.v
000001B8: call action_create_object(argc=3)
000001C0: popz
000001C4: push.imm.e 0
000001C8: conv.i.v
000001CC: push.imm.e 0
000001D0: conv.i.v
000001D4: push.imm.e 495
000001D8: conv.i.v
000001DC: call action_create_object(argc=3)
000001E4: popz
000001E8: push.imm.e 156
000001EC: pushenv 0x21DC2F0
000001F0: push.v mon
000001F8: push.imm.e -100
000001FC: add.i.v
00000200: pop.v.v mon
00000208: popenv 0x41DC2D8
0000020C: call action_kill_object(argc=0)
00000214: popz
00000218: push.imm.e 156
0000021C: pushenv 0x21DC344
00000220: push.imm.e 0
00000224: conv.i.v
00000228: push.imm.e 61
0000022C: conv.i.v
00000230: push.v selec
00000238: call action_if_variable(argc=3)
00000240: pop.v.v local.__b__
00000248: push.local.v local.__b__
00000250: conv.v.b
00000254: bf 0x21DC344
00000258: b 0x21DC34C
0000025C: popenv 0x41DC308
00000260: b 0x21DC350
00000264: popenv 0x1DDC34C
00000268: push.local.v local.__b__
00000270: conv.v.b
00000274: bf 0x21DC438
00000278: push.imm.e 156
0000027C: pushenv 0x21DC3A4
00000280: push.imm.e 4
00000284: conv.i.v
00000288: push.imm.e 1000
0000028C: conv.i.v
00000290: push.v mon
00000298: call action_if_variable(argc=3)
000002A0: pop.v.v local.__b__
000002A8: push.local.v local.__b__
000002B0: conv.v.b
000002B4: bf 0x21DC3A4
000002B8: b 0x21DC3AC
000002BC: popenv 0x41DC368
000002C0: b 0x21DC3B0
000002C4: popenv 0x1DDC3AC
000002C8: push.local.v local.__b__
000002D0: conv.v.b
000002D4: bf 0x21DC438
000002D8: push.imm.e 680
000002DC: conv.i.v
000002E0: push.imm.e -1559
000002E4: conv.i.v
000002E8: push.imm.e 122
000002EC: conv.i.v
000002F0: call action_create_object(argc=3)
000002F8: popz
000002FC: push.imm.e 0
00000300: conv.i.v
00000304: push.imm.e 0
00000308: conv.i.v
0000030C: push.imm.e 496
00000310: conv.i.v
00000314: call action_create_object(argc=3)
0000031C: popz
00000320: push.imm.e 156
00000324: pushenv 0x21DC428
00000328: push.v mon
00000330: push.imm.e -1000
00000334: add.i.v
00000338: pop.v.v mon
00000340: popenv 0x41DC410
00000344: call action_kill_object(argc=0)
0000034C: popz
00000350: push.imm.e 156
00000354: pushenv 0x21DC47C
00000358: push.imm.e 0
0000035C: conv.i.v
00000360: push.imm.e 72
00000364: conv.i.v
00000368: push.v selec
00000370: call action_if_variable(argc=3)
00000378: pop.v.v local.__b__
00000380: push.local.v local.__b__
00000388: conv.v.b
0000038C: bf 0x21DC47C
00000390: b 0x21DC484
00000394: popenv 0x41DC440
00000398: b 0x21DC488
0000039C: popenv 0x1DDC484
000003A0: push.local.v local.__b__
000003A8: conv.v.b
000003AC: bf 0x21DC4EC
000003B0: push.imm.e 680
000003B4: conv.i.v
000003B8: push.imm.e -1559
000003BC: conv.i.v
000003C0: push.imm.e 123
000003C4: conv.i.v
000003C8: call action_create_object(argc=3)
000003D0: popz
000003D4: push.imm.e 0
000003D8: conv.i.v
000003DC: push.imm.e 0
000003E0: conv.i.v
000003E4: push.imm.e 516
000003E8: conv.i.v
000003EC: call action_create_object(argc=3)
000003F4: popz
000003F8: call action_kill_object(argc=0)
00000400: popz
00000404: push.imm.e 156
00000408: pushenv 0x21DC530
0000040C: push.imm.e 0
00000410: conv.i.v
00000414: push.imm.e 71
00000418: conv.i.v
0000041C: push.v selec
00000424: call action_if_variable(argc=3)
0000042C: pop.v.v local.__b__
00000434: push.local.v local.__b__
0000043C: conv.v.b
00000440: bf 0x21DC530
00000444: b 0x21DC538
00000448: popenv 0x41DC4F4
0000044C: b 0x21DC53C
00000450: popenv 0x1DDC538
00000454: push.local.v local.__b__
0000045C: conv.v.b
00000460: bf 0x21DC5C4
00000464: push.imm.e 680
00000468: conv.i.v
0000046C: push.imm.e -1559
00000470: conv.i.v
00000474: push.imm.e 122
00000478: conv.i.v
0000047C: call action_create_object(argc=3)
00000484: popz
00000488: push.imm.e 0
0000048C: conv.i.v
00000490: push.imm.e 0
00000494: conv.i.v
00000498: push.imm.e 517
0000049C: conv.i.v
000004A0: call action_create_object(argc=3)
000004A8: popz
000004AC: push.imm.e 156
000004B0: pushenv 0x21DC5B4
000004B4: push.v mon
000004BC: push.imm.e -20000
000004C0: add.i.v
000004C4: pop.v.v mon
000004CC: popenv 0x41DC59C
000004D0: call action_kill_object(argc=0)
000004D8: popz
000004DC: push.imm.e 156
000004E0: pushenv 0x21DC608
000004E4: push.imm.e 0
000004E8: conv.i.v
000004EC: push.imm.e 63
000004F0: conv.i.v
000004F4: push.v selec
000004FC: call action_if_variable(argc=3)
00000504: pop.v.v local.__b__
0000050C: push.local.v local.__b__
00000514: conv.v.b
00000518: bf 0x21DC608
0000051C: b 0x21DC610
00000520: popenv 0x41DC5CC
00000524: b 0x21DC614
00000528: popenv 0x1DDC610
0000052C: push.local.v local.__b__
00000534: conv.v.b
00000538: bf 0x21DC6FC
0000053C: push.imm.e 156
00000540: pushenv 0x21DC668
00000544: push.imm.e 4
00000548: conv.i.v
0000054C: push.imm.e 7500
00000550: conv.i.v
00000554: push.v mon
0000055C: call action_if_variable(argc=3)
00000564: pop.v.v local.__b__
0000056C: push.local.v local.__b__
00000574: conv.v.b
00000578: bf 0x21DC668
0000057C: b 0x21DC670
00000580: popenv 0x41DC62C
00000584: b 0x21DC674
00000588: popenv 0x1DDC670
0000058C: push.local.v local.__b__
00000594: conv.v.b
00000598: bf 0x21DC6FC
0000059C: push.imm.e 680
000005A0: conv.i.v
000005A4: push.imm.e -1559
000005A8: conv.i.v
000005AC: push.imm.e 122
000005B0: conv.i.v
000005B4: call action_create_object(argc=3)
000005BC: popz
000005C0: push.imm.e 0
000005C4: conv.i.v
000005C8: push.imm.e 0
000005CC: conv.i.v
000005D0: push.imm.e 497
000005D4: conv.i.v
000005D8: call action_create_object(argc=3)
000005E0: popz
000005E4: push.imm.e 156
000005E8: pushenv 0x21DC6EC
000005EC: push.v mon
000005F4: push.imm.e -7500
000005F8: add.i.v
000005FC: pop.v.v mon
00000604: popenv 0x41DC6D4
00000608: call action_kill_object(argc=0)
00000610: popz
00000614: push.imm.e 156
00000618: pushenv 0x21DC740
0000061C: push.imm.e 0
00000620: conv.i.v
00000624: push.imm.e 62
00000628: conv.i.v
0000062C: push.v selec
00000634: call action_if_variable(argc=3)
0000063C: pop.v.v local.__b__
00000644: push.local.v local.__b__
0000064C: conv.v.b
00000650: bf 0x21DC740
00000654: b 0x21DC748
00000658: popenv 0x41DC704
0000065C: b 0x21DC74C
00000660: popenv 0x1DDC748
00000664: push.local.v local.__b__
0000066C: conv.v.b
00000670: bf 0x21DC86C
00000674: push.imm.e 0
00000678: conv.i.v
0000067C: push.imm.e 0
00000680: conv.i.v
00000684: push.v close
0000068C: call action_if_variable(argc=3)
00000694: pop.v.v local.__b__
0000069C: push.local.v local.__b__
000006A4: conv.v.b
000006A8: bf 0x21DC86C
000006AC: push.imm.e 156
000006B0: pushenv 0x21DC7D8
000006B4: push.imm.e 4
000006B8: conv.i.v
000006BC: push.imm.e 10000
000006C0: conv.i.v
000006C4: push.v mon
000006CC: call action_if_variable(argc=3)
000006D4: pop.v.v local.__b__
000006DC: push.local.v local.__b__
000006E4: conv.v.b
000006E8: bf 0x21DC7D8
000006EC: b 0x21DC7E0
000006F0: popenv 0x41DC79C
000006F4: b 0x21DC7E4
000006F8: popenv 0x1DDC7E0
000006FC: push.local.v local.__b__
00000704: conv.v.b
00000708: bf 0x21DC86C
0000070C: push.imm.e 680
00000710: conv.i.v
00000714: push.imm.e -1559
00000718: conv.i.v
0000071C: push.imm.e 122
00000720: conv.i.v
00000724: call action_create_object(argc=3)
0000072C: popz
00000730: push.imm.e 0
00000734: conv.i.v
00000738: push.imm.e 0
0000073C: conv.i.v
00000740: push.imm.e 509
00000744: conv.i.v
00000748: call action_create_object(argc=3)
00000750: popz
00000754: push.imm.e 156
00000758: pushenv 0x21DC85C
0000075C: push.v mon
00000764: push.imm.e -10000
00000768: add.i.v
0000076C: pop.v.v mon
00000774: popenv 0x41DC844
00000778: call action_kill_object(argc=0)
00000780: popz
00000784: push.imm.e 156
00000788: pushenv 0x21DC8B0
0000078C: push.imm.e 0
00000790: conv.i.v
00000794: push.imm.e 60
00000798: conv.i.v
0000079C: push.v selec
000007A4: call action_if_variable(argc=3)
000007AC: pop.v.v local.__b__
000007B4: push.local.v local.__b__
000007BC: conv.v.b
000007C0: bf 0x21DC8B0
000007C4: b 0x21DC8B8
000007C8: popenv 0x41DC874
000007CC: b 0x21DC8BC
000007D0: popenv 0x1DDC8B8
000007D4: push.local.v local.__b__
000007DC: conv.v.b
000007E0: bf 0x21DC9A4
000007E4: push.imm.e 156
000007E8: pushenv 0x21DC910
000007EC: push.imm.e 4
000007F0: conv.i.v
000007F4: push.imm.e 3500
000007F8: conv.i.v
000007FC: push.v mon
00000804: call action_if_variable(argc=3)
0000080C: pop.v.v local.__b__
00000814: push.local.v local.__b__
0000081C: conv.v.b
00000820: bf 0x21DC910
00000824: b 0x21DC918
00000828: popenv 0x41DC8D4
0000082C: b 0x21DC91C
00000830: popenv 0x1DDC918
00000834: push.local.v local.__b__
0000083C: conv.v.b
00000840: bf 0x21DC9A4
00000844: push.imm.e 680
00000848: conv.i.v
0000084C: push.imm.e -1559
00000850: conv.i.v
00000854: push.imm.e 122
00000858: conv.i.v
0000085C: call action_create_object(argc=3)
00000864: popz
00000868: push.imm.e 0
0000086C: conv.i.v
00000870: push.imm.e 0
00000874: conv.i.v
00000878: push.imm.e 507
0000087C: conv.i.v
00000880: call action_create_object(argc=3)
00000888: popz
0000088C: push.imm.e 156
00000890: pushenv 0x21DC994
00000894: push.v mon
0000089C: push.imm.e -3500
000008A0: add.i.v
000008A4: pop.v.v mon
000008AC: popenv 0x41DC97C
000008B0: call action_kill_object(argc=0)
000008B8: popz
000008BC: push.imm.e 156
000008C0: pushenv 0x21DC9E8
000008C4: push.imm.e 0
000008C8: conv.i.v
000008CC: push.imm.e 7
000008D0: conv.i.v
000008D4: push.v selec
000008DC: call action_if_variable(argc=3)
000008E4: pop.v.v local.__b__
000008EC: push.local.v local.__b__
000008F4: conv.v.b
000008F8: bf 0x21DC9E8
000008FC: b 0x21DC9F0
00000900: popenv 0x41DC9AC
00000904: b 0x21DC9F4
00000908: popenv 0x1DDC9F0
0000090C: push.local.v local.__b__
00000914: conv.v.b
00000918: bf 0x21DCAB8
0000091C: push.imm.e 156
00000920: pushenv 0x21DCA48
00000924: push.imm.e 4
00000928: conv.i.v
0000092C: push.imm.e 500
00000930: conv.i.v
00000934: push.v mon
0000093C: call action_if_variable(argc=3)
00000944: pop.v.v local.__b__
0000094C: push.local.v local.__b__
00000954: conv.v.b
00000958: bf 0x21DCA48
0000095C: b 0x21DCA50
00000960: popenv 0x41DCA0C
00000964: b 0x21DCA54
00000968: popenv 0x1DDCA50
0000096C: push.local.v local.__b__
00000974: conv.v.b
00000978: bf 0x21DCAB8
0000097C: push.imm.e 0
00000980: conv.i.v
00000984: push.imm.e 0
00000988: conv.i.v
0000098C: push.imm.e 498
00000990: conv.i.v
00000994: call action_create_object(argc=3)
0000099C: popz
000009A0: push.imm.e 156
000009A4: pushenv 0x21DCAA8
000009A8: push.v mon
000009B0: push.imm.e -500
000009B4: add.i.v
000009B8: pop.v.v mon
000009C0: popenv 0x41DCA90
000009C4: call action_kill_object(argc=0)
000009CC: popz
000009D0: push.imm.e 156
000009D4: pushenv 0x21DCAFC
000009D8: push.imm.e 0
000009DC: conv.i.v
000009E0: push.imm.e 2
000009E4: conv.i.v
000009E8: push.v selec
000009F0: call action_if_variable(argc=3)
000009F8: pop.v.v local.__b__
00000A00: push.local.v local.__b__
00000A08: conv.v.b
00000A0C: bf 0x21DCAFC
00000A10: b 0x21DCB04
00000A14: popenv 0x41DCAC0
00000A18: b 0x21DCB08
00000A1C: popenv 0x1DDCB04
00000A20: push.local.v local.__b__
00000A28: conv.v.b
00000A2C: bf 0x21DCBF0
00000A30: push.imm.e 156
00000A34: pushenv 0x21DCB5C
00000A38: push.imm.e 4
00000A3C: conv.i.v
00000A40: push.imm.e 2000
00000A44: conv.i.v
00000A48: push.v mon
00000A50: call action_if_variable(argc=3)
00000A58: pop.v.v local.__b__
00000A60: push.local.v local.__b__
00000A68: conv.v.b
00000A6C: bf 0x21DCB5C
00000A70: b 0x21DCB64
00000A74: popenv 0x41DCB20
00000A78: b 0x21DCB68
00000A7C: popenv 0x1DDCB64
00000A80: push.local.v local.__b__
00000A88: conv.v.b
00000A8C: bf 0x21DCBF0
00000A90: push.imm.e 680
00000A94: conv.i.v
00000A98: push.imm.e -1559
00000A9C: conv.i.v
00000AA0: push.imm.e 122
00000AA4: conv.i.v
00000AA8: call action_create_object(argc=3)
00000AB0: popz
00000AB4: push.imm.e 0
00000AB8: conv.i.v
00000ABC: push.imm.e 0
00000AC0: conv.i.v
00000AC4: push.imm.e 499
00000AC8: conv.i.v
00000ACC: call action_create_object(argc=3)
00000AD4: popz
00000AD8: push.imm.e 156
00000ADC: pushenv 0x21DCBE0
00000AE0: push.v mon
00000AE8: push.imm.e -2000
00000AEC: add.i.v
00000AF0: pop.v.v mon
00000AF8: popenv 0x41DCBC8
00000AFC: call action_kill_object(argc=0)
00000B04: popz
00000B08: push.imm.e 156
00000B0C: pushenv 0x21DCC34
00000B10: push.imm.e 0
00000B14: conv.i.v
00000B18: push.imm.e 4
00000B1C: conv.i.v
00000B20: push.v selec
00000B28: call action_if_variable(argc=3)
00000B30: pop.v.v local.__b__
00000B38: push.local.v local.__b__
00000B40: conv.v.b
00000B44: bf 0x21DCC34
00000B48: b 0x21DCC3C
00000B4C: popenv 0x41DCBF8
00000B50: b 0x21DCC40
00000B54: popenv 0x1DDCC3C
00000B58: push.local.v local.__b__
00000B60: conv.v.b
00000B64: bf 0x21DCC74
00000B68: push.imm.e 0
00000B6C: conv.i.v
00000B70: push.imm.e 98
00000B74: conv.i.v
00000B78: push.imm.e 445
00000B7C: conv.i.v
00000B80: call action_create_object(argc=3)
00000B88: popz
00000B8C: push.imm.e 156
00000B90: pushenv 0x21DCCB8
00000B94: push.imm.e 0
00000B98: conv.i.v
00000B9C: push.imm.e 82
00000BA0: conv.i.v
00000BA4: push.v selec
00000BAC: call action_if_variable(argc=3)
00000BB4: pop.v.v local.__b__
00000BBC: push.local.v local.__b__
00000BC4: conv.v.b
00000BC8: bf 0x21DCCB8
00000BCC: b 0x21DCCC0
00000BD0: popenv 0x41DCC7C
00000BD4: b 0x21DCCC4
00000BD8: popenv 0x1DDCCC0
00000BDC: push.local.v local.__b__
00000BE4: conv.v.b
00000BE8: bf 0x21DCCF8
00000BEC: push.imm.e 0
00000BF0: conv.i.v
00000BF4: push.imm.e 98
00000BF8: conv.i.v
00000BFC: push.imm.e 445
00000C00: conv.i.v
00000C04: call action_create_object(argc=3)
00000C0C: popz
00000C10: push.imm.e 156
00000C14: pushenv 0x21DCD3C
00000C18: push.imm.e 0
00000C1C: conv.i.v
00000C20: push.imm.e 5
00000C24: conv.i.v
00000C28: push.v selec
00000C30: call action_if_variable(argc=3)
00000C38: pop.v.v local.__b__
00000C40: push.local.v local.__b__
00000C48: conv.v.b
00000C4C: bf 0x21DCD3C
00000C50: b 0x21DCD44
00000C54: popenv 0x41DCD00
00000C58: b 0x21DCD48
00000C5C: popenv 0x1DDCD44
00000C60: push.local.v local.__b__
00000C68: conv.v.b
00000C6C: bf 0x21DCE68
00000C70: push.imm.e 0
00000C74: conv.i.v
00000C78: push.imm.e 0
00000C7C: conv.i.v
00000C80: push.v close
00000C88: call action_if_variable(argc=3)
00000C90: pop.v.v local.__b__
00000C98: push.local.v local.__b__
00000CA0: conv.v.b
00000CA4: bf 0x21DCE68
00000CA8: push.imm.e 156
00000CAC: pushenv 0x21DCDD4
00000CB0: push.imm.e 4
00000CB4: conv.i.v
00000CB8: push.imm.e 20000
00000CBC: conv.i.v
00000CC0: push.v mon
00000CC8: call action_if_variable(argc=3)
00000CD0: pop.v.v local.__b__
00000CD8: push.local.v local.__b__
00000CE0: conv.v.b
00000CE4: bf 0x21DCDD4
00000CE8: b 0x21DCDDC
00000CEC: popenv 0x41DCD98
00000CF0: b 0x21DCDE0
00000CF4: popenv 0x1DDCDDC
00000CF8: push.local.v local.__b__
00000D00: conv.v.b
00000D04: bf 0x21DCE68
00000D08: push.imm.e 680
00000D0C: conv.i.v
00000D10: push.imm.e -1559
00000D14: conv.i.v
00000D18: push.imm.e 123
00000D1C: conv.i.v
00000D20: call action_create_object(argc=3)
00000D28: popz
00000D2C: push.imm.e 0
00000D30: conv.i.v
00000D34: push.imm.e 0
00000D38: conv.i.v
00000D3C: push.imm.e 520
00000D40: conv.i.v
00000D44: call action_create_object(argc=3)
00000D4C: popz
00000D50: push.imm.e 156
00000D54: pushenv 0x21DCE58
00000D58: push.v mon
00000D60: push.imm.e -20000
00000D64: add.i.v
00000D68: pop.v.v mon
00000D70: popenv 0x41DCE40
00000D74: call action_kill_object(argc=0)
00000D7C: popz
00000D80: push.imm.e 156
00000D84: pushenv 0x21DCEAC
00000D88: push.imm.e 0
00000D8C: conv.i.v
00000D90: push.imm.e 3
00000D94: conv.i.v
00000D98: push.v selec
00000DA0: call action_if_variable(argc=3)
00000DA8: pop.v.v local.__b__
00000DB0: push.local.v local.__b__
00000DB8: conv.v.b
00000DBC: bf 0x21DCEAC
00000DC0: b 0x21DCEB4
00000DC4: popenv 0x41DCE70
00000DC8: b 0x21DCEB8
00000DCC: popenv 0x1DDCEB4
00000DD0: push.local.v local.__b__
00000DD8: conv.v.b
00000DDC: bf 0x21DCFD8
00000DE0: push.imm.e 156
00000DE4: pushenv 0x21DCF0C
00000DE8: push.imm.e 4
00000DEC: conv.i.v
00000DF0: push.imm.e 5000
00000DF4: conv.i.v
00000DF8: push.v mon
00000E00: call action_if_variable(argc=3)
00000E08: pop.v.v local.__b__
00000E10: push.local.v local.__b__
00000E18: conv.v.b
00000E1C: bf 0x21DCF0C
00000E20: b 0x21DCF14
00000E24: popenv 0x41DCED0
00000E28: b 0x21DCF18
00000E2C: popenv 0x1DDCF14
00000E30: push.local.v local.__b__
00000E38: conv.v.b
00000E3C: bf 0x21DCFD8
00000E40: push.imm.e 0
00000E44: conv.i.v
00000E48: push.imm.e 0
00000E4C: conv.i.v
00000E50: push.v close
00000E58: call action_if_variable(argc=3)
00000E60: pop.v.v local.__b__
00000E68: push.local.v local.__b__
00000E70: conv.v.b
00000E74: bf 0x21DCFD8
00000E78: push.imm.e 680
00000E7C: conv.i.v
00000E80: push.imm.e -1559
00000E84: conv.i.v
00000E88: push.imm.e 122
00000E8C: conv.i.v
00000E90: call action_create_object(argc=3)
00000E98: popz
00000E9C: push.imm.e 0
00000EA0: conv.i.v
00000EA4: push.imm.e 0
00000EA8: conv.i.v
00000EAC: push.imm.e 508
00000EB0: conv.i.v
00000EB4: call action_create_object(argc=3)
00000EBC: popz
00000EC0: push.imm.e 156
00000EC4: pushenv 0x21DCFC8
00000EC8: push.v mon
00000ED0: push.imm.e -5000
00000ED4: add.i.v
00000ED8: pop.v.v mon
00000EE0: popenv 0x41DCFB0
00000EE4: call action_kill_object(argc=0)
00000EEC: popz
00000EF0: push.imm.e 156
00000EF4: pushenv 0x21DD01C
00000EF8: push.imm.e 0
00000EFC: conv.i.v
00000F00: push.imm.e 3
00000F04: conv.i.v
00000F08: push.v selec
00000F10: call action_if_variable(argc=3)
00000F18: pop.v.v local.__b__
00000F20: push.local.v local.__b__
00000F28: conv.v.b
00000F2C: bf 0x21DD01C
00000F30: b 0x21DD024
00000F34: popenv 0x41DCFE0
00000F38: b 0x21DD028
00000F3C: popenv 0x1DDD024
00000F40: push.local.v local.__b__
00000F48: conv.v.b
00000F4C: bf 0x21DD0F4
00000F50: push.imm.e 156
00000F54: pushenv 0x21DD07C
00000F58: push.imm.e 4
00000F5C: conv.i.v
00000F60: push.imm.e 5000
00000F64: conv.i.v
00000F68: push.v mon
00000F70: call action_if_variable(argc=3)
00000F78: pop.v.v local.__b__
00000F80: push.local.v local.__b__
00000F88: conv.v.b
00000F8C: bf 0x21DD07C
00000F90: b 0x21DD084
00000F94: popenv 0x41DD040
00000F98: b 0x21DD088
00000F9C: popenv 0x1DDD084
00000FA0: push.local.v local.__b__
00000FA8: conv.v.b
00000FAC: bf 0x21DD0F4
00000FB0: push.imm.e 0
00000FB4: conv.i.v
00000FB8: push.imm.e 1
00000FBC: conv.i.v
00000FC0: push.v close
00000FC8: call action_if_variable(argc=3)
00000FD0: pop.v.v local.__b__
00000FD8: push.local.v local.__b__
00000FE0: conv.v.b
00000FE4: bf 0x21DD0F4
00000FE8: push.imm.e 0
00000FEC: conv.i.v
00000FF0: push.imm.e 0
00000FF4: conv.i.v
00000FF8: push.imm.e 708
00000FFC: conv.i.v
00001000: call action_create_object(argc=3)
00001008: popz
0000100C: push.imm.e 156
00001010: pushenv 0x21DD138
00001014: push.imm.e 0
00001018: conv.i.v
0000101C: push.imm.e 5
00001020: conv.i.v
00001024: push.v selec
0000102C: call action_if_variable(argc=3)
00001034: pop.v.v local.__b__
0000103C: push.local.v local.__b__
00001044: conv.v.b
00001048: bf 0x21DD138
0000104C: b 0x21DD140
00001050: popenv 0x41DD0FC
00001054: b 0x21DD144
00001058: popenv 0x1DDD140
0000105C: push.local.v local.__b__
00001064: conv.v.b
00001068: bf 0x21DD210
0000106C: push.imm.e 156
00001070: pushenv 0x21DD198
00001074: push.imm.e 4
00001078: conv.i.v
0000107C: push.imm.e 20000
00001080: conv.i.v
00001084: push.v mon
0000108C: call action_if_variable(argc=3)
00001094: pop.v.v local.__b__
0000109C: push.local.v local.__b__
000010A4: conv.v.b
000010A8: bf 0x21DD198
000010AC: b 0x21DD1A0
000010B0: popenv 0x41DD15C
000010B4: b 0x21DD1A4
000010B8: popenv 0x1DDD1A0
000010BC: push.local.v local.__b__
000010C4: conv.v.b
000010C8: bf 0x21DD210
000010CC: push.imm.e 0
000010D0: conv.i.v
000010D4: push.imm.e 1
000010D8: conv.i.v
000010DC: push.v close
000010E4: call action_if_variable(argc=3)
000010EC: pop.v.v local.__b__
000010F4: push.local.v local.__b__
000010FC: conv.v.b
00001100: bf 0x21DD210
00001104: push.imm.e 0
00001108: conv.i.v
0000110C: push.imm.e 0
00001110: conv.i.v
00001114: push.imm.e 708
00001118: conv.i.v
0000111C: call action_create_object(argc=3)
00001124: popz
00001128: push.imm.e 156
0000112C: pushenv 0x21DD254
00001130: push.imm.e 0
00001134: conv.i.v
00001138: push.imm.e 62
0000113C: conv.i.v
00001140: push.v selec
00001148: call action_if_variable(argc=3)
00001150: pop.v.v local.__b__
00001158: push.local.v local.__b__
00001160: conv.v.b
00001164: bf 0x21DD254
00001168: b 0x21DD25C
0000116C: popenv 0x41DD218
00001170: b 0x21DD260
00001174: popenv 0x1DDD25C
00001178: push.local.v local.__b__
00001180: conv.v.b
00001184: bf 0x21DD32C
00001188: push.imm.e 156
0000118C: pushenv 0x21DD2B4
00001190: push.imm.e 4
00001194: conv.i.v
00001198: push.imm.e 10000
0000119C: conv.i.v
000011A0: push.v mon
000011A8: call action_if_variable(argc=3)
000011B0: pop.v.v local.__b__
000011B8: push.local.v local.__b__
000011C0: conv.v.b
000011C4: bf 0x21DD2B4
000011C8: b 0x21DD2BC
000011CC: popenv 0x41DD278
000011D0: b 0x21DD2C0
000011D4: popenv 0x1DDD2BC
000011D8: push.local.v local.__b__
000011E0: conv.v.b
000011E4: bf 0x21DD32C
000011E8: push.imm.e 0
000011EC: conv.i.v
000011F0: push.imm.e 1
000011F4: conv.i.v
000011F8: push.v close
00001200: call action_if_variable(argc=3)
00001208: pop.v.v local.__b__
00001210: push.local.v local.__b__
00001218: conv.v.b
0000121C: bf 0x21DD32C
00001220: push.imm.e 0
00001224: conv.i.v
00001228: push.imm.e 0
0000122C: conv.i.v
00001230: push.imm.e 708
00001234: conv.i.v
00001238: call action_create_object(argc=3)
00001240: popz
00001244: push.imm.e 0
00001248: conv.i.v
0000124C: call action_set_relative(argc=1)
00001254: popz