// gml_Object_tincom_Step_0  locals=2 args=0 len=340
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21102B4
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.d 0.3
00000054: push.global.v global.sca
0000005C: mul.v.d
00000060: push.d 0.3
0000006C: push.global.v global.sca
00000074: mul.v.d
00000078: call action_sprite_transform(argc=4)
00000080: popz
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.builtin.v os_type
0000009C: call action_if_variable(argc=3)
000000A4: pop.v.v local.__b__
000000AC: push.local.v local.__b__
000000B4: conv.v.b
000000B8: bf 0x2110318
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.global.v global.sca
000000D4: push.global.v global.sca
000000DC: call action_sprite_transform(argc=4)
000000E4: popz
000000E8: push.imm.e -1
000000EC: push.imm.e 0
000000F0: push.v obj0.view_yview[array]
000000F8: push.imm.e -1
000000FC: push.imm.e 0
00000100: push.v obj0.view_hview[array]
00000108: push.imm.e 2
0000010C: conv.i.d
00000110: div.d.v
00000114: add.v.v
00000118: push.imm.e -1
0000011C: push.imm.e 0
00000120: push.v obj0.view_xview[array]
00000128: push.imm.e -1
0000012C: push.imm.e 0
00000130: push.v obj0.view_wview[array]
00000138: push.imm.e 2
0000013C: conv.i.d
00000140: div.d.v
00000144: add.v.v
00000148: call action_move_to(argc=2)
00000150: popz