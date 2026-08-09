// gml_Object_stella3_Step_0  locals=2 args=0 len=1120
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.v obj140.x
00000034: push.v obj141.x
0000003C: sub.v.v
00000040: pop.v.v shifta
00000048: push.imm.e 2
0000004C: conv.i.v
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.v shifta
00000060: call action_if_variable(argc=3)
00000068: pop.v.v local.__b__
00000070: push.local.v local.__b__
00000078: conv.v.b
0000007C: bf 0x21DFA4C
00000080: push.imm.e 0
00000084: pop.v.i shifta
0000008C: push.imm.e 1
00000090: conv.i.v
00000094: push.imm.e -1000
00000098: conv.i.v
0000009C: push.v shifta
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x21DFA90
000000C4: push.imm.e -1000
000000C8: pop.v.i shifta
000000D0: push.imm.e 617
000000D4: pushenv 0x21DFAD4
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.v menoo
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21DFAD4
00000110: b 0x21DFADC
00000114: popenv 0x41DFA98
00000118: b 0x21DFAE0
0000011C: popenv 0x1DDFADC
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21DFB38
00000130: push.v obj617.y
00000138: push.imm.e 100
0000013C: push.global.v global.sca
00000144: mul.v.i
00000148: sub.v.v
0000014C: push.v obj617.x
00000154: push.imm.e 200
00000158: push.global.v global.sca
00000160: mul.v.i
00000164: add.v.v
00000168: call action_move_to(argc=2)
00000170: popz
00000174: b 0x21DFB54
00000178: push.imm.e -1000
0000017C: conv.i.v
00000180: push.imm.e -1000
00000184: conv.i.v
00000188: call action_move_to(argc=2)
00000190: popz
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: push.imm.e 1
000001A0: conv.i.v
000001A4: push.v unlocinque
000001AC: call action_if_variable(argc=3)
000001B4: pop.v.v local.__b__
000001BC: push.local.v local.__b__
000001C4: conv.v.b
000001C8: bf 0x21DFC74
000001CC: push.imm.e 0
000001D0: conv.i.v
000001D4: push.imm.e 0
000001D8: conv.i.v
000001DC: push.v over
000001E4: call action_if_variable(argc=3)
000001EC: pop.v.v local.__b__
000001F4: push.local.v local.__b__
000001FC: conv.v.b
00000200: bf 0x21DFC70
00000204: push.imm.e 156
00000208: pushenv 0x21DFC08
0000020C: push.imm.e 0
00000210: conv.i.v
00000214: push.imm.e 82
00000218: conv.i.v
0000021C: push.v selec
00000224: call action_if_variable(argc=3)
0000022C: pop.v.v local.__b__
00000234: push.local.v local.__b__
0000023C: conv.v.b
00000240: bf 0x21DFC08
00000244: b 0x21DFC10
00000248: popenv 0x41DFBCC
0000024C: b 0x21DFC14
00000250: popenv 0x1DDFC10
00000254: push.local.v local.__b__
0000025C: conv.v.b
00000260: bf 0x21DFC4C
00000264: push.imm.e 1
00000268: conv.i.v
0000026C: push.imm.e 0
00000270: conv.i.v
00000274: push.imm.e 467
00000278: conv.i.v
0000027C: call action_sprite_set(argc=3)
00000284: popz
00000288: b 0x21DFC70
0000028C: push.imm.e 1
00000290: conv.i.v
00000294: push.imm.e 0
00000298: conv.i.v
0000029C: push.imm.e 466
000002A0: conv.i.v
000002A4: call action_sprite_set(argc=3)
000002AC: popz
000002B0: b 0x21DFC98
000002B4: push.imm.e 1
000002B8: conv.i.v
000002BC: push.imm.e 0
000002C0: conv.i.v
000002C4: push.imm.e 468
000002C8: conv.i.v
000002CC: call action_sprite_set(argc=3)
000002D4: popz
000002D8: push.imm.e 0
000002DC: conv.i.v
000002E0: push.imm.e 1
000002E4: conv.i.v
000002E8: push.v unlocinque
000002F0: call action_if_variable(argc=3)
000002F8: pop.v.v local.__b__
00000300: push.local.v local.__b__
00000308: conv.v.b
0000030C: bf 0x21DFD2C
00000310: push.imm.e 2
00000314: conv.i.v
00000318: push.imm.e 0
0000031C: conv.i.v
00000320: push.imm.e 483
00000324: conv.i.v
00000328: call action_if_number(argc=3)
00000330: pop.v.v local.__b__
00000338: push.local.v local.__b__
00000340: conv.v.b
00000344: bf 0x21DFD2C
00000348: push.imm.e 156
0000034C: pushenv 0x21DFD1C
00000350: push.imm.e 0
00000354: pop.v.i selec
0000035C: popenv 0x41DFD10
00000360: push.imm.e 0
00000364: pop.v.i unlocinque
0000036C: push.imm.e 0
00000370: conv.i.v
00000374: push.imm.e 0
00000378: conv.i.v
0000037C: push.v unlocinque
00000384: call action_if_variable(argc=3)
0000038C: pop.v.v local.__b__
00000394: push.local.v local.__b__
0000039C: conv.v.b
000003A0: bf 0x21DFE20
000003A4: push.imm.e 2
000003A8: conv.i.v
000003AC: push.imm.e 0
000003B0: conv.i.v
000003B4: push.imm.e 483
000003B8: conv.i.v
000003BC: call action_if_number(argc=3)
000003C4: pop.v.v local.__b__
000003CC: push.local.v local.__b__
000003D4: conv.v.b
000003D8: bf 0x21DFE20
000003DC: push.imm.e 156
000003E0: pushenv 0x21DFDE0
000003E4: push.imm.e 4
000003E8: conv.i.v
000003EC: push.imm.e 100
000003F0: conv.i.v
000003F4: push.v biotech
000003FC: call action_if_variable(argc=3)
00000404: pop.v.v local.__b__
0000040C: push.local.v local.__b__
00000414: conv.v.b
00000418: bf 0x21DFDE0
0000041C: b 0x21DFDE8
00000420: popenv 0x41DFDA4
00000424: b 0x21DFDEC
00000428: popenv 0x1DDFDE8
0000042C: push.local.v local.__b__
00000434: conv.v.b
00000438: bf 0x21DFE20
0000043C: push.imm.e 156
00000440: pushenv 0x21DFE10
00000444: push.imm.e 0
00000448: pop.v.i biotech
00000450: popenv 0x41DFE04
00000454: push.imm.e 1
00000458: pop.v.i unlocinque