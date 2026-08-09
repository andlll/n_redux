// gml_Object_impa32r_Alarm_0  locals=2 args=0 len=1776
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.v demos
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x2143BDC
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 24
00000044: conv.i.v
00000048: call action_set_alarm(argc=2)
00000050: popz
00000054: push.v phase
0000005C: push.imm.e 1
00000060: cmp.i.v ==
00000064: bf 0x214363C
00000068: push.imm.e 95
0000006C: pop.v.i sprite_index
00000074: push.v phase
0000007C: push.imm.e 1
00000080: add.i.v
00000084: pop.v.v phase
0000008C: exit
00000090: push.v phase
00000098: push.imm.e 2
0000009C: cmp.i.v ==
000000A0: bf 0x2143678
000000A4: push.imm.e 93
000000A8: pop.v.i sprite_index
000000B0: push.v phase
000000B8: push.imm.e 1
000000BC: add.i.v
000000C0: pop.v.v phase
000000C8: exit
000000CC: push.v phase
000000D4: push.imm.e 3
000000D8: cmp.i.v ==
000000DC: bf 0x21436B4
000000E0: push.imm.e 91
000000E4: pop.v.i sprite_index
000000EC: push.v phase
000000F4: push.imm.e 1
000000F8: add.i.v
000000FC: pop.v.v phase
00000104: exit
00000108: push.v phase
00000110: push.imm.e 4
00000114: cmp.i.v ==
00000118: bf 0x21436F0
0000011C: push.imm.e 89
00000120: pop.v.i sprite_index
00000128: push.v phase
00000130: push.imm.e 1
00000134: add.i.v
00000138: pop.v.v phase
00000140: exit
00000144: push.v phase
0000014C: push.imm.e 5
00000150: cmp.i.v ==
00000154: bf 0x214372C
00000158: push.imm.e 87
0000015C: pop.v.i sprite_index
00000164: push.v phase
0000016C: push.imm.e 1
00000170: add.i.v
00000174: pop.v.v phase
0000017C: exit
00000180: push.v phase
00000188: push.imm.e 6
0000018C: cmp.i.v ==
00000190: bf 0x2143768
00000194: push.imm.e 85
00000198: pop.v.i sprite_index
000001A0: push.v phase
000001A8: push.imm.e 1
000001AC: add.i.v
000001B0: pop.v.v phase
000001B8: exit
000001BC: push.v phase
000001C4: push.imm.e 7
000001C8: cmp.i.v ==
000001CC: bf 0x21437A4
000001D0: push.imm.e 83
000001D4: pop.v.i sprite_index
000001DC: push.v phase
000001E4: push.imm.e 1
000001E8: add.i.v
000001EC: pop.v.v phase
000001F4: exit
000001F8: push.v phase
00000200: push.imm.e 8
00000204: cmp.i.v ==
00000208: bf 0x21437E0
0000020C: push.imm.e 81
00000210: pop.v.i sprite_index
00000218: push.v phase
00000220: push.imm.e 1
00000224: add.i.v
00000228: pop.v.v phase
00000230: exit
00000234: push.v phase
0000023C: push.imm.e 9
00000240: cmp.i.v ==
00000244: bf 0x214381C
00000248: push.imm.e 79
0000024C: pop.v.i sprite_index
00000254: push.v phase
0000025C: push.imm.e 1
00000260: add.i.v
00000264: pop.v.v phase
0000026C: exit
00000270: push.v phase
00000278: push.imm.e 10
0000027C: cmp.i.v ==
00000280: bf 0x2143858
00000284: push.imm.e 77
00000288: pop.v.i sprite_index
00000290: push.v phase
00000298: push.imm.e 1
0000029C: add.i.v
000002A0: pop.v.v phase
000002A8: exit
000002AC: push.v phase
000002B4: push.imm.e 11
000002B8: cmp.i.v ==
000002BC: bf 0x2143894
000002C0: push.imm.e 75
000002C4: pop.v.i sprite_index
000002CC: push.v phase
000002D4: push.imm.e 1
000002D8: add.i.v
000002DC: pop.v.v phase
000002E4: exit
000002E8: push.v phase
000002F0: push.imm.e 12
000002F4: cmp.i.v ==
000002F8: bf 0x21438D0
000002FC: push.imm.e 73
00000300: pop.v.i sprite_index
00000308: push.v phase
00000310: push.imm.e 1
00000314: add.i.v
00000318: pop.v.v phase
00000320: exit
00000324: push.v phase
0000032C: push.imm.e 13
00000330: cmp.i.v ==
00000334: bf 0x214390C
00000338: push.imm.e 71
0000033C: pop.v.i sprite_index
00000344: push.v phase
0000034C: push.imm.e 1
00000350: add.i.v
00000354: pop.v.v phase
0000035C: exit
00000360: push.v phase
00000368: push.imm.e 14
0000036C: cmp.i.v ==
00000370: bf 0x2143948
00000374: push.imm.e 69
00000378: pop.v.i sprite_index
00000380: push.v phase
00000388: push.imm.e 1
0000038C: add.i.v
00000390: pop.v.v phase
00000398: exit
0000039C: push.v phase
000003A4: push.imm.e 15
000003A8: cmp.i.v ==
000003AC: bf 0x2143984
000003B0: push.imm.e 67
000003B4: pop.v.i sprite_index
000003BC: push.v phase
000003C4: push.imm.e 1
000003C8: add.i.v
000003CC: pop.v.v phase
000003D4: exit
000003D8: push.v phase
000003E0: push.imm.e 16
000003E4: cmp.i.v ==
000003E8: bf 0x21439C0
000003EC: push.imm.e 65
000003F0: pop.v.i sprite_index
000003F8: push.v phase
00000400: push.imm.e 1
00000404: add.i.v
00000408: pop.v.v phase
00000410: exit
00000414: push.v phase
0000041C: push.imm.e 17
00000420: cmp.i.v ==
00000424: bf 0x21439FC
00000428: push.imm.e 63
0000042C: pop.v.i sprite_index
00000434: push.v phase
0000043C: push.imm.e 1
00000440: add.i.v
00000444: pop.v.v phase
0000044C: exit
00000450: push.v phase
00000458: push.imm.e 18
0000045C: cmp.i.v ==
00000460: bf 0x2143A38
00000464: push.imm.e 61
00000468: pop.v.i sprite_index
00000470: push.v phase
00000478: push.imm.e 1
0000047C: add.i.v
00000480: pop.v.v phase
00000488: exit
0000048C: push.v phase
00000494: push.imm.e 19
00000498: cmp.i.v ==
0000049C: bf 0x2143A74
000004A0: push.imm.e 59
000004A4: pop.v.i sprite_index
000004AC: push.v phase
000004B4: push.imm.e 1
000004B8: add.i.v
000004BC: pop.v.v phase
000004C4: exit
000004C8: push.v phase
000004D0: push.imm.e 20
000004D4: cmp.i.v ==
000004D8: bf 0x2143AB0
000004DC: push.imm.e 57
000004E0: pop.v.i sprite_index
000004E8: push.v phase
000004F0: push.imm.e 1
000004F4: add.i.v
000004F8: pop.v.v phase
00000500: exit
00000504: push.v phase
0000050C: push.imm.e 21
00000510: cmp.i.v ==
00000514: bf 0x2143AEC
00000518: push.imm.e 55
0000051C: pop.v.i sprite_index
00000524: push.v phase
0000052C: push.imm.e 1
00000530: add.i.v
00000534: pop.v.v phase
0000053C: exit
00000540: push.v phase
00000548: push.imm.e 22
0000054C: cmp.i.v ==
00000550: bf 0x2143B28
00000554: push.imm.e 53
00000558: pop.v.i sprite_index
00000560: push.v phase
00000568: push.imm.e 1
0000056C: add.i.v
00000570: pop.v.v phase
00000578: exit
0000057C: push.v phase
00000584: push.imm.e 23
00000588: cmp.i.v ==
0000058C: bf 0x2143B64
00000590: push.imm.e 51
00000594: pop.v.i sprite_index
0000059C: push.v phase
000005A4: push.imm.e 1
000005A8: add.i.v
000005AC: pop.v.v phase
000005B4: exit
000005B8: push.v phase
000005C0: push.imm.e 24
000005C4: cmp.i.v ==
000005C8: bf 0x2143BA0
000005CC: push.imm.e 49
000005D0: pop.v.i sprite_index
000005D8: push.v phase
000005E0: push.imm.e 1
000005E4: add.i.v
000005E8: pop.v.v phase
000005F0: exit
000005F4: push.v phase
000005FC: push.imm.e 25
00000600: cmp.i.v ==
00000604: bf 0x2143BDC
00000608: push.imm.e 47
0000060C: pop.v.i sprite_index
00000614: push.v phase
0000061C: push.imm.e 1
00000620: add.i.v
00000624: pop.v.v phase
0000062C: exit
00000630: push.imm.e 156
00000634: pushenv 0x2143C20
00000638: push.imm.e 2
0000063C: conv.i.v
00000640: push.imm.e -1000
00000644: conv.i.v
00000648: push.v ele
00000650: call action_if_variable(argc=3)
00000658: pop.v.v local.__b__
00000660: push.local.v local.__b__
00000668: conv.v.b
0000066C: bf 0x2143C20
00000670: b 0x2143C28
00000674: popenv 0x4143BE4
00000678: b 0x2143C2C
0000067C: popenv 0x1D43C28
00000680: push.local.v local.__b__
00000688: conv.v.b
0000068C: bf 0x2143C9C
00000690: push.imm.e 156
00000694: pushenv 0x2143C80
00000698: push.imm.e 2
0000069C: conv.i.v
000006A0: push.imm.e -1000
000006A4: conv.i.v
000006A8: push.v mon
000006B0: call action_if_variable(argc=3)
000006B8: pop.v.v local.__b__
000006C0: push.local.v local.__b__
000006C8: conv.v.b
000006CC: bf 0x2143C80
000006D0: b 0x2143C88
000006D4: popenv 0x4143C44
000006D8: b 0x2143C8C
000006DC: popenv 0x1D43C88
000006E0: push.local.v local.__b__
000006E8: conv.v.b
000006EC: bf 0x2143C9C