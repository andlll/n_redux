// gml_Object_pu2_Step_0  locals=2 args=0 len=660
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
0000007C: bf 0x21E01A0
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
000000C0: bf 0x21E01E4
000000C4: push.imm.e -1000
000000C8: pop.v.i shifta
000000D0: push.imm.e 617
000000D4: pushenv 0x21E0228
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.v menoo
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21E0228
00000110: b 0x21E0230
00000114: popenv 0x41E01EC
00000118: b 0x21E0234
0000011C: popenv 0x1DE0230
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21E02A8
00000130: push.imm.e -1
00000134: push.imm.e 0
00000138: push.v obj0.view_hview[array]
00000140: push.imm.e -1
00000144: push.imm.e 0
00000148: push.v obj0.view_yview[array]
00000150: add.v.v
00000154: push.imm.e -1
00000158: push.imm.e 0
0000015C: push.v obj0.view_xview[array]
00000164: push.imm.e 184
00000168: push.global.v global.sca
00000170: mul.v.i
00000174: add.v.v
00000178: push.v shifta
00000180: add.v.v
00000184: call action_move_to(argc=2)
0000018C: popz
00000190: b 0x21E02C4
00000194: push.imm.e -1000
00000198: conv.i.v
0000019C: push.imm.e -1000
000001A0: conv.i.v
000001A4: call action_move_to(argc=2)
000001AC: popz
000001B0: push.imm.e 0
000001B4: conv.i.v
000001B8: push.imm.e 0
000001BC: conv.i.v
000001C0: push.v over
000001C8: call action_if_variable(argc=3)
000001D0: pop.v.v local.__b__
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x21E03A8
000001E8: push.imm.e 156
000001EC: pushenv 0x21E0340
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: push.imm.e 2
000001FC: conv.i.v
00000200: push.v selec
00000208: call action_if_variable(argc=3)
00000210: pop.v.v local.__b__
00000218: push.local.v local.__b__
00000220: conv.v.b
00000224: bf 0x21E0340
00000228: b 0x21E0348
0000022C: popenv 0x41E0304
00000230: b 0x21E034C
00000234: popenv 0x1DE0348
00000238: push.local.v local.__b__
00000240: conv.v.b
00000244: bf 0x21E0384
00000248: push.imm.e 1
0000024C: conv.i.v
00000250: push.imm.e 0
00000254: conv.i.v
00000258: push.imm.e 501
0000025C: conv.i.v
00000260: call action_sprite_set(argc=3)
00000268: popz
0000026C: b 0x21E03A8
00000270: push.imm.e 1
00000274: conv.i.v
00000278: push.imm.e 0
0000027C: conv.i.v
00000280: push.imm.e 499
00000284: conv.i.v
00000288: call action_sprite_set(argc=3)
00000290: popz