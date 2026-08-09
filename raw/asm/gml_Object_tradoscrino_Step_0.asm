// gml_Object_tradoscrino_Step_0  locals=2 args=0 len=208
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e 0
00000030: conv.i.v
00000034: push.imm.e 4
00000038: conv.i.v
0000003C: push.builtin.v os_type
00000044: call action_if_variable(argc=3)
0000004C: pop.v.v local.__b__
00000054: push.local.v local.__b__
0000005C: conv.v.b
00000060: bf 0x20C28D0
00000064: push.imm.e -1
00000068: push.imm.e 0
0000006C: push.v obj0.view_yview[array]
00000074: push.imm.e -1
00000078: push.imm.e 0
0000007C: push.v obj0.view_hview[array]
00000084: push.imm.e 2
00000088: conv.i.d
0000008C: div.d.v
00000090: add.v.v
00000094: push.imm.e -1
00000098: push.imm.e 0
0000009C: push.v obj0.view_xview[array]
000000A4: push.imm.e -1
000000A8: push.imm.e 0
000000AC: push.v obj0.view_wview[array]
000000B4: push.imm.e 2
000000B8: conv.i.d
000000BC: div.d.v
000000C0: add.v.v
000000C4: call action_move_to(argc=2)
000000CC: popz