// gml_Object_blacker1_Draw_64  locals=2 args=0 len=332
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 5000
0000000C: conv.i.v
00000010: push.imm.e 5000
00000014: conv.i.v
00000018: push.imm.e 0
0000001C: conv.i.v
00000020: push.imm.e 0
00000024: conv.i.v
00000028: call draw_rectangle(argc=5)
00000030: popz
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.builtin.v os_type
0000004C: call action_if_variable(argc=3)
00000054: pop.v.v local.__b__
0000005C: push.local.v local.__b__
00000064: conv.v.b
00000068: bf 0x209EA90
0000006C: push.imm.e -1
00000070: conv.i.v
00000074: push.imm.e -1
00000078: push.imm.e 0
0000007C: push.v obj0.view_hview[array]
00000084: push.imm.e 2
00000088: conv.i.d
0000008C: div.d.v
00000090: push.imm.e -1
00000094: push.imm.e 0
00000098: push.v obj0.view_wview[array]
000000A0: push.imm.e 2
000000A4: conv.i.d
000000A8: div.d.v
000000AC: push.imm.e 6
000000B0: conv.i.v
000000B4: call action_draw_sprite(argc=4)
000000BC: popz
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 4
000000CC: conv.i.v
000000D0: push.builtin.v os_type
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x209EB1C
000000F8: push.imm.e -1
000000FC: conv.i.v
00000100: push.imm.e -1
00000104: push.imm.e 0
00000108: push.v obj0.view_hview[array]
00000110: push.imm.e 2
00000114: conv.i.d
00000118: div.d.v
0000011C: push.imm.e -1
00000120: push.imm.e 0
00000124: push.v obj0.view_wview[array]
0000012C: push.imm.e 2
00000130: conv.i.d
00000134: div.d.v
00000138: push.imm.e 7
0000013C: conv.i.v
00000140: call action_draw_sprite(argc=4)
00000148: popz