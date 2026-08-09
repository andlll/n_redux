// gml_Object_pureset_Step_0  locals=2 args=0 len=304
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
00000048: push.imm.e 617
0000004C: pushenv 0x21E1DC0
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.v menoo
00000068: call action_if_variable(argc=3)
00000070: pop.v.v local.__b__
00000078: push.local.v local.__b__
00000080: conv.v.b
00000084: bf 0x21E1DC0
00000088: b 0x21E1DC8
0000008C: popenv 0x41E1D84
00000090: b 0x21E1DCC
00000094: popenv 0x1DE1DC8
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x21E1E48
000000A8: push.imm.e -1
000000AC: push.imm.e 0
000000B0: push.v obj0.view_hview[array]
000000B8: push.imm.e -1
000000BC: push.imm.e 0
000000C0: push.v obj0.view_yview[array]
000000C8: add.v.v
000000CC: push.imm.e 20
000000D0: push.global.v global.sca
000000D8: mul.v.i
000000DC: sub.v.v
000000E0: push.imm.e -1
000000E4: push.imm.e 0
000000E8: push.v obj0.view_xview[array]
000000F0: push.imm.e 461
000000F4: push.global.v global.sca
000000FC: mul.v.i
00000100: add.v.v
00000104: call action_move_to(argc=2)
0000010C: popz
00000110: b 0x21E1E64
00000114: push.imm.e -1000
00000118: conv.i.v
0000011C: push.imm.e -1000
00000120: conv.i.v
00000124: call action_move_to(argc=2)
0000012C: popz