// gml_Object_stella1_Step_0  locals=2 args=0 len=856
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
0000007C: bf 0x21DEDDC
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
000000C0: bf 0x21DEE20
000000C4: push.imm.e -1000
000000C8: pop.v.i shifta
000000D0: push.imm.e 617
000000D4: pushenv 0x21DEE64
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.v menoo
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21DEE64
00000110: b 0x21DEE6C
00000114: popenv 0x41DEE28
00000118: b 0x21DEE70
0000011C: popenv 0x1DDEE6C
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21DEEB4
00000130: push.v obj617.y
00000138: push.imm.e 100
0000013C: push.global.v global.sca
00000144: mul.v.i
00000148: sub.v.v
0000014C: push.v obj617.x
00000154: call action_move_to(argc=2)
0000015C: popz
00000160: b 0x21DEED0
00000164: push.imm.e -1000
00000168: conv.i.v
0000016C: push.imm.e -1000
00000170: conv.i.v
00000174: call action_move_to(argc=2)
0000017C: popz
00000180: push.imm.e 0
00000184: conv.i.v
00000188: push.imm.e 1
0000018C: conv.i.v
00000190: push.v unlocinque
00000198: call action_if_variable(argc=3)
000001A0: pop.v.v local.__b__
000001A8: push.local.v local.__b__
000001B0: conv.v.b
000001B4: bf 0x21DEFF0
000001B8: push.imm.e 0
000001BC: conv.i.v
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: push.v over
000001D0: call action_if_variable(argc=3)
000001D8: pop.v.v local.__b__
000001E0: push.local.v local.__b__
000001E8: conv.v.b
000001EC: bf 0x21DEFEC
000001F0: push.imm.e 156
000001F4: pushenv 0x21DEF84
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.imm.e 71
00000204: conv.i.v
00000208: push.v selec
00000210: call action_if_variable(argc=3)
00000218: pop.v.v local.__b__
00000220: push.local.v local.__b__
00000228: conv.v.b
0000022C: bf 0x21DEF84
00000230: b 0x21DEF8C
00000234: popenv 0x41DEF48
00000238: b 0x21DEF90
0000023C: popenv 0x1DDEF8C
00000240: push.local.v local.__b__
00000248: conv.v.b
0000024C: bf 0x21DEFC8
00000250: push.imm.e 1
00000254: conv.i.v
00000258: push.imm.e 0
0000025C: conv.i.v
00000260: push.imm.e 461
00000264: conv.i.v
00000268: call action_sprite_set(argc=3)
00000270: popz
00000274: b 0x21DEFEC
00000278: push.imm.e 1
0000027C: conv.i.v
00000280: push.imm.e 0
00000284: conv.i.v
00000288: push.imm.e 460
0000028C: conv.i.v
00000290: call action_sprite_set(argc=3)
00000298: popz
0000029C: b 0x21DF014
000002A0: push.imm.e 1
000002A4: conv.i.v
000002A8: push.imm.e 0
000002AC: conv.i.v
000002B0: push.imm.e 462
000002B4: conv.i.v
000002B8: call action_sprite_set(argc=3)
000002C0: popz
000002C4: push.imm.e 0
000002C8: conv.i.v
000002CC: push.imm.e 1
000002D0: conv.i.v
000002D4: push.v unlocinque
000002DC: call action_if_variable(argc=3)
000002E4: pop.v.v local.__b__
000002EC: push.local.v local.__b__
000002F4: conv.v.b
000002F8: bf 0x21DF0A8
000002FC: push.imm.e 2
00000300: conv.i.v
00000304: push.imm.e 0
00000308: conv.i.v
0000030C: push.imm.e 517
00000310: conv.i.v
00000314: call action_if_number(argc=3)
0000031C: pop.v.v local.__b__
00000324: push.local.v local.__b__
0000032C: conv.v.b
00000330: bf 0x21DF0A8
00000334: push.imm.e 156
00000338: pushenv 0x21DF098
0000033C: push.imm.e 0
00000340: pop.v.i selec
00000348: popenv 0x41DF08C
0000034C: push.imm.e 0
00000350: pop.v.i unlocinque