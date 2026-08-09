// gml_Object_alertalaert_Step_0  locals=2 args=0 len=284
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e -1
00000030: push.imm.e 0
00000034: push.v obj0.view_yview[array]
0000003C: push.imm.e -1
00000040: push.imm.e 0
00000044: push.v obj0.view_hview[array]
0000004C: push.imm.e 2
00000050: conv.i.d
00000054: div.d.v
00000058: add.v.v
0000005C: push.imm.e -1
00000060: push.imm.e 0
00000064: push.v obj0.view_xview[array]
0000006C: push.imm.e -1
00000070: push.imm.e 0
00000074: push.v obj0.view_wview[array]
0000007C: push.imm.e 2
00000080: conv.i.d
00000084: div.d.v
00000088: add.v.v
0000008C: call action_move_to(argc=2)
00000094: popz
00000098: push.imm.e 156
0000009C: pushenv 0x21E78E4
000000A0: push.imm.e 2
000000A4: conv.i.v
000000A8: push.imm.e 1000
000000AC: conv.i.v
000000B0: push.v oil
000000B8: call action_if_variable(argc=3)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x21E78E4
000000D8: b 0x21E78EC
000000DC: popenv 0x41E78A8
000000E0: b 0x21E78F0
000000E4: popenv 0x1DE78EC
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x21E7924
000000F8: push.imm.e 156
000000FC: pushenv 0x21E7914
00000100: push.imm.e 0
00000104: pop.v.i allerta
0000010C: popenv 0x41E7908
00000110: call action_kill_object(argc=0)
00000118: popz