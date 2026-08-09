// gml_Object_parco_Mouse_4  locals=2 args=0 len=908
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20D4A58
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20D4A58
00000054: b 0x20D4A60
00000058: popenv 0x40D4A1C
0000005C: b 0x20D4A64
00000060: popenv 0x1CD4A60
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20D4BD4
00000074: push.imm.e 156
00000078: pushenv 0x20D4AB8
0000007C: push.imm.e 4
00000080: conv.i.v
00000084: push.imm.e 500
00000088: conv.i.v
0000008C: push.v mon
00000094: call action_if_variable(argc=3)
0000009C: pop.v.v local.__b__
000000A4: push.local.v local.__b__
000000AC: conv.v.b
000000B0: bf 0x20D4AB8
000000B4: b 0x20D4AC0
000000B8: popenv 0x40D4A7C
000000BC: b 0x20D4AC4
000000C0: popenv 0x1CD4AC0
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x20D4BD4
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.imm.e 0
000000E0: conv.i.v
000000E4: push.v oversolar
000000EC: call action_if_variable(argc=3)
000000F4: pop.v.v local.__b__
000000FC: push.local.v local.__b__
00000104: conv.v.b
00000108: bf 0x20D4BD4
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 0
00000118: conv.i.v
0000011C: push.imm.e 127
00000120: conv.i.v
00000124: call action_if_number(argc=3)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x20D4BD4
00000144: push.imm.e 1
00000148: pop.v.i redder
00000150: push.imm.e 1
00000154: conv.i.v
00000158: call action_set_relative(argc=1)
00000160: popz
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: push.imm.e 0
00000170: conv.i.v
00000174: push.imm.e 127
00000178: conv.i.v
0000017C: call action_create_object(argc=3)
00000184: popz
00000188: push.imm.e 0
0000018C: conv.i.v
00000190: call action_set_relative(argc=1)
00000198: popz
0000019C: push.imm.e 9
000001A0: conv.i.v
000001A4: push.imm.e 2
000001A8: conv.i.v
000001AC: call action_set_alarm(argc=2)
000001B4: popz
000001B8: push.imm.e 1
000001BC: conv.i.v
000001C0: push.imm.e 255
000001C4: conv.i.v
000001C8: call action_sprite_color(argc=2)
000001D0: popz
000001D4: push.imm.e 156
000001D8: pushenv 0x20D4C18
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 61
000001E8: conv.i.v
000001EC: push.v selec
000001F4: call action_if_variable(argc=3)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x20D4C18
00000214: b 0x20D4C20
00000218: popenv 0x40D4BDC
0000021C: b 0x20D4C24
00000220: popenv 0x1CD4C20
00000224: push.local.v local.__b__
0000022C: conv.v.b
00000230: bf 0x20D4D78
00000234: push.imm.e 156
00000238: pushenv 0x20D4C78
0000023C: push.imm.e 4
00000240: conv.i.v
00000244: push.imm.e 1000
00000248: conv.i.v
0000024C: push.v mon
00000254: call action_if_variable(argc=3)
0000025C: pop.v.v local.__b__
00000264: push.local.v local.__b__
0000026C: conv.v.b
00000270: bf 0x20D4C78
00000274: b 0x20D4C80
00000278: popenv 0x40D4C3C
0000027C: b 0x20D4C84
00000280: popenv 0x1CD4C80
00000284: push.local.v local.__b__
0000028C: conv.v.b
00000290: bf 0x20D4D78
00000294: push.imm.e 1
00000298: conv.i.v
0000029C: call action_set_relative(argc=1)
000002A4: popz
000002A8: push.imm.e 680
000002AC: conv.i.v
000002B0: push.imm.e -1559
000002B4: conv.i.v
000002B8: push.imm.e 122
000002BC: conv.i.v
000002C0: call action_create_object(argc=3)
000002C8: popz
000002CC: push.imm.e 0
000002D0: conv.i.v
000002D4: call action_set_relative(argc=1)
000002DC: popz
000002E0: push.imm.e 1
000002E4: conv.i.v
000002E8: call action_set_relative(argc=1)
000002F0: popz
000002F4: push.imm.e 0
000002F8: conv.i.v
000002FC: push.imm.e 0
00000300: conv.i.v
00000304: push.imm.e 496
00000308: conv.i.v
0000030C: call action_create_object(argc=3)
00000314: popz
00000318: push.imm.e 0
0000031C: conv.i.v
00000320: call action_set_relative(argc=1)
00000328: popz
0000032C: push.imm.e 156
00000330: pushenv 0x20D4D74
00000334: push.imm.e 1
00000338: conv.i.v
0000033C: call action_set_relative(argc=1)
00000344: popz
00000348: push.v mon
00000350: push.imm.e -1000
00000354: add.i.v
00000358: pop.v.v mon
00000360: push.imm.e 0
00000364: conv.i.v
00000368: call action_set_relative(argc=1)
00000370: popz
00000374: popenv 0x40D4D34
00000378: push.imm.e 0
0000037C: conv.i.v
00000380: call action_set_relative(argc=1)
00000388: popz