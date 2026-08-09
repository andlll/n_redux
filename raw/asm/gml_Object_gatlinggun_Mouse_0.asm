// gml_Object_gatlinggun_Mouse_0  locals=2 args=0 len=4664
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 15
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20F34B8
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: push.imm.e 550
00000044: conv.i.v
00000048: push.imm.e 15
0000004C: conv.i.v
00000050: call distance_to_object(argc=1)
00000058: call action_if_variable(argc=3)
00000060: pop.v.v local.__b__
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: bf 0x20F34B8
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 1
00000084: conv.i.v
00000088: push.v launching
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20F34B8
000000B0: push.imm.e 15
000000B4: conv.i.v
000000B8: push.v y
000000C0: push.v x
000000C8: call instance_nearest(argc=3)
000000D0: conv.v.i
000000D4: push.v [stacktop].y
000000DC: push.imm.e 15
000000E0: conv.i.v
000000E4: push.v y
000000EC: push.v x
000000F4: call instance_nearest(argc=3)
000000FC: conv.v.i
00000100: push.v [stacktop].x
00000108: push.v y
00000110: push.v x
00000118: call point_direction(argc=4)
00000120: pop.v.v direttorio
00000128: push.imm.e 1
0000012C: pop.v.i spra
00000134: push.imm.e 0
00000138: pop.v.i launching
00000140: push.imm.e 1
00000144: pop.v.i amove
0000014C: push.imm.e 3
00000150: push.imm.e -1
00000154: push.imm.e 11
00000158: pop.v.i obj0.alarm[array]
00000160: push.imm.e 6
00000164: push.imm.e -1
00000168: push.imm.e 6
0000016C: pop.v.i obj0.alarm[array]
00000174: push.v direttorio
0000017C: push.d 22.5
00000188: cmp.d.v <=
0000018C: bf 0x20F24EC
00000190: push.imm.e 212
00000194: pop.v.i sprite_index
0000019C: push.imm.e 610
000001A0: conv.i.v
000001A4: push.v y
000001AC: push.imm.e 123
000001B0: sub.i.v
000001B4: push.v x
000001BC: push.imm.e 127
000001C0: add.i.v
000001C4: call instance_create(argc=3)
000001CC: popz
000001D0: push.imm.e 610
000001D4: conv.i.v
000001D8: push.v y
000001E0: push.imm.e 155
000001E4: sub.i.v
000001E8: push.v x
000001F0: push.imm.e 128
000001F4: add.i.v
000001F8: call instance_create(argc=3)
00000200: popz
00000204: push.imm.e 143
00000208: conv.i.v
0000020C: push.v y
00000214: push.imm.e 123
00000218: sub.i.v
0000021C: push.v x
00000224: push.imm.e 127
00000228: add.i.v
0000022C: call instance_create(argc=3)
00000234: popz
00000238: push.imm.e 143
0000023C: conv.i.v
00000240: push.v y
00000248: push.imm.e 155
0000024C: sub.i.v
00000250: push.v x
00000258: push.imm.e 128
0000025C: add.i.v
00000260: call instance_create(argc=3)
00000268: popz
0000026C: push.v direttorio
00000274: push.d 22.5
00000280: cmp.d.v >
00000284: bf 0x20F25F8
00000288: push.v direttorio
00000290: push.imm.e 45
00000294: cmp.i.v <=
00000298: bf 0x20F25F8
0000029C: push.imm.e 214
000002A0: pop.v.i sprite_index
000002A8: push.imm.e 615
000002AC: conv.i.v
000002B0: push.v y
000002B8: push.imm.e 153
000002BC: sub.i.v
000002C0: push.v x
000002C8: push.imm.e 124
000002CC: add.i.v
000002D0: call instance_create(argc=3)
000002D8: popz
000002DC: push.imm.e 615
000002E0: conv.i.v
000002E4: push.v y
000002EC: push.imm.e 182
000002F0: sub.i.v
000002F4: push.v x
000002FC: push.imm.e 106
00000300: add.i.v
00000304: call instance_create(argc=3)
0000030C: popz
00000310: push.imm.e 143
00000314: conv.i.v
00000318: push.v y
00000320: push.imm.e 153
00000324: sub.i.v
00000328: push.v x
00000330: push.imm.e 124
00000334: add.i.v
00000338: call instance_create(argc=3)
00000340: popz
00000344: push.imm.e 143
00000348: conv.i.v
0000034C: push.v y
00000354: push.imm.e 182
00000358: sub.i.v
0000035C: push.v x
00000364: push.imm.e 106
00000368: add.i.v
0000036C: call instance_create(argc=3)
00000374: popz
00000378: push.v direttorio
00000380: push.imm.e 45
00000384: cmp.i.v >
00000388: bf 0x20F2704
0000038C: push.v direttorio
00000394: push.d 67.5
000003A0: cmp.d.v <=
000003A4: bf 0x20F2704
000003A8: push.imm.e 216
000003AC: pop.v.i sprite_index
000003B4: push.imm.e 615
000003B8: conv.i.v
000003BC: push.v y
000003C4: push.imm.e 184
000003C8: sub.i.v
000003CC: push.v x
000003D4: push.imm.e 109
000003D8: add.i.v
000003DC: call instance_create(argc=3)
000003E4: popz
000003E8: push.imm.e 615
000003EC: conv.i.v
000003F0: push.v y
000003F8: push.imm.e 202
000003FC: sub.i.v
00000400: push.v x
00000408: push.imm.e 69
0000040C: add.i.v
00000410: call instance_create(argc=3)
00000418: popz
0000041C: push.imm.e 143
00000420: conv.i.v
00000424: push.v y
0000042C: push.imm.e 184
00000430: sub.i.v
00000434: push.v x
0000043C: push.imm.e 109
00000440: add.i.v
00000444: call instance_create(argc=3)
0000044C: popz
00000450: push.imm.e 143
00000454: conv.i.v
00000458: push.v y
00000460: push.imm.e 202
00000464: sub.i.v
00000468: push.v x
00000470: push.imm.e 69
00000474: add.i.v
00000478: call instance_create(argc=3)
00000480: popz
00000484: push.v direttorio
0000048C: push.d 67.5
00000498: cmp.d.v >
0000049C: bf 0x20F2810
000004A0: push.v direttorio
000004A8: push.imm.e 90
000004AC: cmp.i.v <=
000004B0: bf 0x20F2810
000004B4: push.imm.e 218
000004B8: pop.v.i sprite_index
000004C0: push.imm.e 615
000004C4: conv.i.v
000004C8: push.v y
000004D0: push.imm.e 201
000004D4: sub.i.v
000004D8: push.v x
000004E0: push.imm.e 74
000004E4: add.i.v
000004E8: call instance_create(argc=3)
000004F0: popz
000004F4: push.imm.e 615
000004F8: conv.i.v
000004FC: push.v y
00000504: push.imm.e 211
00000508: sub.i.v
0000050C: push.v x
00000514: push.imm.e 26
00000518: add.i.v
0000051C: call instance_create(argc=3)
00000524: popz
00000528: push.imm.e 143
0000052C: conv.i.v
00000530: push.v y
00000538: push.imm.e 201
0000053C: sub.i.v
00000540: push.v x
00000548: push.imm.e 74
0000054C: add.i.v
00000550: call instance_create(argc=3)
00000558: popz
0000055C: push.imm.e 143
00000560: conv.i.v
00000564: push.v y
0000056C: push.imm.e 211
00000570: sub.i.v
00000574: push.v x
0000057C: push.imm.e 26
00000580: add.i.v
00000584: call instance_create(argc=3)
0000058C: popz
00000590: push.v direttorio
00000598: push.imm.e 90
0000059C: cmp.i.v >
000005A0: bf 0x20F291C
000005A4: push.v direttorio
000005AC: push.d 112.5
000005B8: cmp.d.v <=
000005BC: bf 0x20F291C
000005C0: push.imm.e 220
000005C4: pop.v.i sprite_index
000005CC: push.imm.e 615
000005D0: conv.i.v
000005D4: push.v y
000005DC: push.imm.e 213
000005E0: sub.i.v
000005E4: push.v x
000005EC: push.imm.e 25
000005F0: add.i.v
000005F4: call instance_create(argc=3)
000005FC: popz
00000600: push.imm.e 615
00000604: conv.i.v
00000608: push.v y
00000610: push.imm.e 213
00000614: sub.i.v
00000618: push.v x
00000620: push.imm.e 27
00000624: sub.i.v
00000628: call instance_create(argc=3)
00000630: popz
00000634: push.imm.e 143
00000638: conv.i.v
0000063C: push.v y
00000644: push.imm.e 213
00000648: sub.i.v
0000064C: push.v x
00000654: push.imm.e 25
00000658: add.i.v
0000065C: call instance_create(argc=3)
00000664: popz
00000668: push.imm.e 143
0000066C: conv.i.v
00000670: push.v y
00000678: push.imm.e 213
0000067C: sub.i.v
00000680: push.v x
00000688: push.imm.e 27
0000068C: sub.i.v
00000690: call instance_create(argc=3)
00000698: popz
0000069C: push.v direttorio
000006A4: push.d 112.5
000006B0: cmp.d.v >
000006B4: bf 0x20F2A28
000006B8: push.v direttorio
000006C0: push.imm.e 135
000006C4: cmp.i.v <=
000006C8: bf 0x20F2A28
000006CC: push.imm.e 222
000006D0: pop.v.i sprite_index
000006D8: push.imm.e 615
000006DC: conv.i.v
000006E0: push.v y
000006E8: push.imm.e 210
000006EC: sub.i.v
000006F0: push.v x
000006F8: push.imm.e 25
000006FC: sub.i.v
00000700: call instance_create(argc=3)
00000708: popz
0000070C: push.imm.e 615
00000710: conv.i.v
00000714: push.v y
0000071C: push.imm.e 198
00000720: sub.i.v
00000724: push.v x
0000072C: push.imm.e 75
00000730: sub.i.v
00000734: call instance_create(argc=3)
0000073C: popz
00000740: push.imm.e 143
00000744: conv.i.v
00000748: push.v y
00000750: push.imm.e 210
00000754: sub.i.v
00000758: push.v x
00000760: push.imm.e 25
00000764: sub.i.v
00000768: call instance_create(argc=3)
00000770: popz
00000774: push.imm.e 143
00000778: conv.i.v
0000077C: push.v y
00000784: push.imm.e 198
00000788: sub.i.v
0000078C: push.v x
00000794: push.imm.e 75
00000798: sub.i.v
0000079C: call instance_create(argc=3)
000007A4: popz
000007A8: push.v direttorio
000007B0: push.imm.e 135
000007B4: cmp.i.v >
000007B8: bf 0x20F2B34
000007BC: push.v direttorio
000007C4: push.d 157.5
000007D0: cmp.d.v <=
000007D4: bf 0x20F2B34
000007D8: push.imm.e 224
000007DC: pop.v.i sprite_index
000007E4: push.imm.e 615
000007E8: conv.i.v
000007EC: push.v y
000007F4: push.imm.e 169
000007F8: sub.i.v
000007FC: push.v x
00000804: push.imm.e 68
00000808: sub.i.v
0000080C: call instance_create(argc=3)
00000814: popz
00000818: push.imm.e 615
0000081C: conv.i.v
00000820: push.v y
00000828: push.imm.e 175
0000082C: sub.i.v
00000830: push.v x
00000838: push.imm.e 107
0000083C: sub.i.v
00000840: call instance_create(argc=3)
00000848: popz
0000084C: push.imm.e 143
00000850: conv.i.v
00000854: push.v y
0000085C: push.imm.e 169
00000860: sub.i.v
00000864: push.v x
0000086C: push.imm.e 68
00000870: sub.i.v
00000874: call instance_create(argc=3)
0000087C: popz
00000880: push.imm.e 143
00000884: conv.i.v
00000888: push.v y
00000890: push.imm.e 175
00000894: sub.i.v
00000898: push.v x
000008A0: push.imm.e 107
000008A4: sub.i.v
000008A8: call instance_create(argc=3)
000008B0: popz
000008B4: push.v direttorio
000008BC: push.d 157.5
000008C8: cmp.d.v >
000008CC: bf 0x20F2C40
000008D0: push.v direttorio
000008D8: push.imm.e 180
000008DC: cmp.i.v <=
000008E0: bf 0x20F2C40
000008E4: push.imm.e 226
000008E8: pop.v.i sprite_index
000008F0: push.imm.e 615
000008F4: conv.i.v
000008F8: push.v y
00000900: push.imm.e 180
00000904: sub.i.v
00000908: push.v x
00000910: push.imm.e 104
00000914: sub.i.v
00000918: call instance_create(argc=3)
00000920: popz
00000924: push.imm.e 615
00000928: conv.i.v
0000092C: push.v y
00000934: push.imm.e 150
00000938: sub.i.v
0000093C: push.v x
00000944: push.imm.e 125
00000948: sub.i.v
0000094C: call instance_create(argc=3)
00000954: popz
00000958: push.imm.e 143
0000095C: conv.i.v
00000960: push.v y
00000968: push.imm.e 180
0000096C: sub.i.v
00000970: push.v x
00000978: push.imm.e 104
0000097C: sub.i.v
00000980: call instance_create(argc=3)
00000988: popz
0000098C: push.imm.e 143
00000990: conv.i.v
00000994: push.v y
0000099C: push.imm.e 180
000009A0: sub.i.v
000009A4: push.v x
000009AC: push.imm.e 125
000009B0: sub.i.v
000009B4: call instance_create(argc=3)
000009BC: popz
000009C0: push.v direttorio
000009C8: push.imm.e 180
000009CC: cmp.i.v >
000009D0: bf 0x20F2D4C
000009D4: push.v direttorio
000009DC: push.d 202.5
000009E8: cmp.d.v <=
000009EC: bf 0x20F2D4C
000009F0: push.imm.e 228
000009F4: pop.v.i sprite_index
000009FC: push.imm.e 610
00000A00: conv.i.v
00000A04: push.v y
00000A0C: push.imm.e 157
00000A10: sub.i.v
00000A14: push.v x
00000A1C: push.imm.e 125
00000A20: sub.i.v
00000A24: call instance_create(argc=3)
00000A2C: popz
00000A30: push.imm.e 610
00000A34: conv.i.v
00000A38: push.v y
00000A40: push.imm.e 122
00000A44: sub.i.v
00000A48: push.v x
00000A50: push.imm.e 127
00000A54: sub.i.v
00000A58: call instance_create(argc=3)
00000A60: popz
00000A64: push.imm.e 143
00000A68: conv.i.v
00000A6C: push.v y
00000A74: push.imm.e 157
00000A78: sub.i.v
00000A7C: push.v x
00000A84: push.imm.e 125
00000A88: sub.i.v
00000A8C: call instance_create(argc=3)
00000A94: popz
00000A98: push.imm.e 143
00000A9C: conv.i.v
00000AA0: push.v y
00000AA8: push.imm.e 122
00000AAC: sub.i.v
00000AB0: push.v x
00000AB8: push.imm.e 127
00000ABC: sub.i.v
00000AC0: call instance_create(argc=3)
00000AC8: popz
00000ACC: push.v direttorio
00000AD4: push.d 202.5
00000AE0: cmp.d.v >
00000AE4: bf 0x20F2E58
00000AE8: push.v direttorio
00000AF0: push.imm.e 225
00000AF4: cmp.i.v <=
00000AF8: bf 0x20F2E58
00000AFC: push.imm.e 230
00000B00: pop.v.i sprite_index
00000B08: push.imm.e 610
00000B0C: conv.i.v
00000B10: push.v y
00000B18: push.imm.e 130
00000B1C: sub.i.v
00000B20: push.v x
00000B28: push.imm.e 128
00000B2C: sub.i.v
00000B30: call instance_create(argc=3)
00000B38: popz
00000B3C: push.imm.e 610
00000B40: conv.i.v
00000B44: push.v y
00000B4C: push.imm.e 100
00000B50: sub.i.v
00000B54: push.v x
00000B5C: push.imm.e 107
00000B60: sub.i.v
00000B64: call instance_create(argc=3)
00000B6C: popz
00000B70: push.imm.e 143
00000B74: conv.i.v
00000B78: push.v y
00000B80: push.imm.e 130
00000B84: sub.i.v
00000B88: push.v x
00000B90: push.imm.e 128
00000B94: sub.i.v
00000B98: call instance_create(argc=3)
00000BA0: popz
00000BA4: push.imm.e 143
00000BA8: conv.i.v
00000BAC: push.v y
00000BB4: push.imm.e 100
00000BB8: sub.i.v
00000BBC: push.v x
00000BC4: push.imm.e 107
00000BC8: sub.i.v
00000BCC: call instance_create(argc=3)
00000BD4: popz
00000BD8: push.v direttorio
00000BE0: push.imm.e 225
00000BE4: cmp.i.v >
00000BE8: bf 0x20F2F64
00000BEC: push.v direttorio
00000BF4: push.d 247.5
00000C00: cmp.d.v <=
00000C04: bf 0x20F2F64
00000C08: push.imm.e 232
00000C0C: pop.v.i sprite_index
00000C14: push.imm.e 610
00000C18: conv.i.v
00000C1C: push.v y
00000C24: push.imm.e 105
00000C28: sub.i.v
00000C2C: push.v x
00000C34: push.imm.e 107
00000C38: sub.i.v
00000C3C: call instance_create(argc=3)
00000C44: popz
00000C48: push.imm.e 610
00000C4C: conv.i.v
00000C50: push.v y
00000C58: push.imm.e 81
00000C5C: sub.i.v
00000C60: push.v x
00000C68: push.imm.e 72
00000C6C: sub.i.v
00000C70: call instance_create(argc=3)
00000C78: popz
00000C7C: push.imm.e 143
00000C80: conv.i.v
00000C84: push.v y
00000C8C: push.imm.e 105
00000C90: sub.i.v
00000C94: push.v x
00000C9C: push.imm.e 107
00000CA0: sub.i.v
00000CA4: call instance_create(argc=3)
00000CAC: popz
00000CB0: push.imm.e 143
00000CB4: conv.i.v
00000CB8: push.v y
00000CC0: push.imm.e 81
00000CC4: sub.i.v
00000CC8: push.v x
00000CD0: push.imm.e 72
00000CD4: sub.i.v
00000CD8: call instance_create(argc=3)
00000CE0: popz
00000CE4: push.v direttorio
00000CEC: push.d 247.5
00000CF8: cmp.d.v >
00000CFC: bf 0x20F3070
00000D00: push.v direttorio
00000D08: push.imm.e 270
00000D0C: cmp.i.v <=
00000D10: bf 0x20F3070
00000D14: push.imm.e 234
00000D18: pop.v.i sprite_index
00000D20: push.imm.e 610
00000D24: conv.i.v
00000D28: push.v y
00000D30: push.imm.e 84
00000D34: sub.i.v
00000D38: push.v x
00000D40: push.imm.e 74
00000D44: sub.i.v
00000D48: call instance_create(argc=3)
00000D50: popz
00000D54: push.imm.e 610
00000D58: conv.i.v
00000D5C: push.v y
00000D64: push.imm.e 72
00000D68: sub.i.v
00000D6C: push.v x
00000D74: push.imm.e 27
00000D78: sub.i.v
00000D7C: call instance_create(argc=3)
00000D84: popz
00000D88: push.imm.e 143
00000D8C: conv.i.v
00000D90: push.v y
00000D98: push.imm.e 84
00000D9C: sub.i.v
00000DA0: push.v x
00000DA8: push.imm.e 74
00000DAC: sub.i.v
00000DB0: call instance_create(argc=3)
00000DB8: popz
00000DBC: push.imm.e 143
00000DC0: conv.i.v
00000DC4: push.v y
00000DCC: push.imm.e 72
00000DD0: sub.i.v
00000DD4: push.v x
00000DDC: push.imm.e 27
00000DE0: sub.i.v
00000DE4: call instance_create(argc=3)
00000DEC: popz
00000DF0: push.v direttorio
00000DF8: push.imm.e 270
00000DFC: cmp.i.v >
00000E00: bf 0x20F317C
00000E04: push.v direttorio
00000E0C: push.d 292.5
00000E18: cmp.d.v <=
00000E1C: bf 0x20F317C
00000E20: push.imm.e 236
00000E24: pop.v.i sprite_index
00000E2C: push.imm.e 610
00000E30: conv.i.v
00000E34: push.v y
00000E3C: push.imm.e 74
00000E40: sub.i.v
00000E44: push.v x
00000E4C: push.imm.e 31
00000E50: sub.i.v
00000E54: call instance_create(argc=3)
00000E5C: popz
00000E60: push.imm.e 610
00000E64: conv.i.v
00000E68: push.v y
00000E70: push.imm.e 76
00000E74: sub.i.v
00000E78: push.v x
00000E80: push.imm.e 21
00000E84: add.i.v
00000E88: call instance_create(argc=3)
00000E90: popz
00000E94: push.imm.e 143
00000E98: conv.i.v
00000E9C: push.v y
00000EA4: push.imm.e 74
00000EA8: sub.i.v
00000EAC: push.v x
00000EB4: push.imm.e 31
00000EB8: sub.i.v
00000EBC: call instance_create(argc=3)
00000EC4: popz
00000EC8: push.imm.e 143
00000ECC: conv.i.v
00000ED0: push.v y
00000ED8: push.imm.e 76
00000EDC: sub.i.v
00000EE0: push.v x
00000EE8: push.imm.e 21
00000EEC: add.i.v
00000EF0: call instance_create(argc=3)
00000EF8: popz
00000EFC: push.v direttorio
00000F04: push.d 292.5
00000F10: cmp.d.v >
00000F14: bf 0x20F3288
00000F18: push.v direttorio
00000F20: push.imm.e 315
00000F24: cmp.i.v <=
00000F28: bf 0x20F3288
00000F2C: push.imm.e 238
00000F30: pop.v.i sprite_index
00000F38: push.imm.e 610
00000F3C: conv.i.v
00000F40: push.v y
00000F48: push.imm.e 78
00000F4C: sub.i.v
00000F50: push.v x
00000F58: push.imm.e 19
00000F5C: add.i.v
00000F60: call instance_create(argc=3)
00000F68: popz
00000F6C: push.imm.e 610
00000F70: conv.i.v
00000F74: push.v y
00000F7C: push.imm.e 87
00000F80: sub.i.v
00000F84: push.v x
00000F8C: push.imm.e 68
00000F90: add.i.v
00000F94: call instance_create(argc=3)
00000F9C: popz
00000FA0: push.imm.e 143
00000FA4: conv.i.v
00000FA8: push.v y
00000FB0: push.imm.e 78
00000FB4: sub.i.v
00000FB8: push.v x
00000FC0: push.imm.e 19
00000FC4: add.i.v
00000FC8: call instance_create(argc=3)
00000FD0: popz
00000FD4: push.imm.e 143
00000FD8: conv.i.v
00000FDC: push.v y
00000FE4: push.imm.e 87
00000FE8: sub.i.v
00000FEC: push.v x
00000FF4: push.imm.e 68
00000FF8: add.i.v
00000FFC: call instance_create(argc=3)
00001004: popz
00001008: push.v direttorio
00001010: push.imm.e 315
00001014: cmp.i.v >
00001018: bf 0x20F3394
0000101C: push.v direttorio
00001024: push.d 337.5
00001030: cmp.d.v <=
00001034: bf 0x20F3394
00001038: push.imm.e 208
0000103C: pop.v.i sprite_index
00001044: push.imm.e 610
00001048: conv.i.v
0000104C: push.v y
00001054: push.imm.e 76
00001058: sub.i.v
0000105C: push.v x
00001064: push.imm.e 72
00001068: add.i.v
0000106C: call instance_create(argc=3)
00001074: popz
00001078: push.imm.e 610
0000107C: conv.i.v
00001080: push.v y
00001088: push.imm.e 95
0000108C: sub.i.v
00001090: push.v x
00001098: push.imm.e 108
0000109C: add.i.v
000010A0: call instance_create(argc=3)
000010A8: popz
000010AC: push.imm.e 143
000010B0: conv.i.v
000010B4: push.v y
000010BC: push.imm.e 76
000010C0: sub.i.v
000010C4: push.v x
000010CC: push.imm.e 72
000010D0: add.i.v
000010D4: call instance_create(argc=3)
000010DC: popz
000010E0: push.imm.e 143
000010E4: conv.i.v
000010E8: push.v y
000010F0: push.imm.e 95
000010F4: sub.i.v
000010F8: push.v x
00001100: push.imm.e 108
00001104: add.i.v
00001108: call instance_create(argc=3)
00001110: popz
00001114: push.v direttorio
0000111C: push.d 337.5
00001128: cmp.d.v >
0000112C: bf 0x20F34A0
00001130: push.v direttorio
00001138: push.imm.e 360
0000113C: cmp.i.v <=
00001140: bf 0x20F34A0
00001144: push.imm.e 210
00001148: pop.v.i sprite_index
00001150: push.imm.e 610
00001154: conv.i.v
00001158: push.v y
00001160: push.imm.e 95
00001164: sub.i.v
00001168: push.v x
00001170: push.imm.e 104
00001174: add.i.v
00001178: call instance_create(argc=3)
00001180: popz
00001184: push.imm.e 610
00001188: conv.i.v
0000118C: push.v y
00001194: push.imm.e 125
00001198: sub.i.v
0000119C: push.v x
000011A4: push.imm.e 126
000011A8: add.i.v
000011AC: call instance_create(argc=3)
000011B4: popz
000011B8: push.imm.e 143
000011BC: conv.i.v
000011C0: push.v y
000011C8: push.imm.e 95
000011CC: sub.i.v
000011D0: push.v x
000011D8: push.imm.e 104
000011DC: add.i.v
000011E0: call instance_create(argc=3)
000011E8: popz
000011EC: push.imm.e 143
000011F0: conv.i.v
000011F4: push.v y
000011FC: push.imm.e 125
00001200: sub.i.v
00001204: push.v x
0000120C: push.imm.e 126
00001210: add.i.v
00001214: call instance_create(argc=3)
0000121C: popz
00001220: push.imm.e 156
00001224: pushenv 0x20F34B4
00001228: push.imm.e 0
0000122C: pop.v.i selec
00001234: popenv 0x40F34A8