// gml_Object_eyebutton_Step_0  locals=2 args=0 len=256
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e 617
00000030: pushenv 0x21E4B10
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.v menoo
0000004C: call action_if_variable(argc=3)
00000054: pop.v.v local.__b__
0000005C: push.local.v local.__b__
00000064: conv.v.b
00000068: bf 0x21E4B10
0000006C: b 0x21E4B18
00000070: popenv 0x41E4AD4
00000074: b 0x21E4B1C
00000078: popenv 0x1DE4B18
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x21E4B84
0000008C: push.imm.e -1
00000090: push.imm.e 0
00000094: push.v obj0.view_hview[array]
0000009C: push.imm.e -1
000000A0: push.imm.e 0
000000A4: push.v obj0.view_yview[array]
000000AC: add.v.v
000000B0: push.imm.e -1
000000B4: push.imm.e 0
000000B8: push.v obj0.view_xview[array]
000000C0: push.imm.e 192
000000C4: push.global.v global.sca
000000CC: mul.v.i
000000D0: add.v.v
000000D4: call action_move_to(argc=2)
000000DC: popz
000000E0: b 0x21E4BA0
000000E4: push.imm.e -1000
000000E8: conv.i.v
000000EC: push.imm.e -1000
000000F0: conv.i.v
000000F4: call action_move_to(argc=2)
000000FC: popz