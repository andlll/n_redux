// gml_Object_positionb_Step_0  locals=2 args=0 len=432
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: push.imm.e -1
0000000C: push.imm.e 0
00000010: push.v obj0.view_yview[array]
00000018: push.imm.e -1
0000001C: push.imm.e 0
00000020: push.v obj0.view_hview[array]
00000028: add.v.v
0000002C: push.imm.e 100
00000030: sub.i.v
00000034: push.builtin.v mouse_y
0000003C: call action_if_variable(argc=3)
00000044: pop.v.v local.__b__
0000004C: push.local.v local.__b__
00000054: conv.v.b
00000058: bf 0x20BFFD8
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 4
00000068: conv.i.v
0000006C: push.builtin.v os_type
00000074: call action_if_variable(argc=3)
0000007C: pop.v.v local.__b__
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x20BFFD8
00000094: push.imm.e 1
00000098: conv.i.v
0000009C: call action_if_mouse(argc=1)
000000A4: pop.v.v local.__b__
000000AC: push.local.v local.__b__
000000B4: conv.v.b
000000B8: bf 0x20BFFD8
000000BC: push.builtin.v mouse_y
000000C4: push.builtin.v mouse_x
000000CC: call action_move_to(argc=2)
000000D4: popz
000000D8: push.imm.e 2
000000DC: conv.i.v
000000E0: push.imm.e -1
000000E4: push.imm.e 0
000000E8: push.v obj0.view_yview[array]
000000F0: push.imm.e -1
000000F4: push.imm.e 0
000000F8: push.v obj0.view_hview[array]
00000100: add.v.v
00000104: push.imm.e 100
00000108: sub.i.v
0000010C: push.builtin.v mouse_y
00000114: call action_if_variable(argc=3)
0000011C: pop.v.v local.__b__
00000124: push.local.v local.__b__
0000012C: conv.v.b
00000130: bf 0x20C00B0
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.builtin.v os_type
0000014C: call action_if_variable(argc=3)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x20C00B0
0000016C: push.imm.e 2
00000170: conv.i.v
00000174: call action_if_mouse(argc=1)
0000017C: pop.v.v local.__b__
00000184: push.local.v local.__b__
0000018C: conv.v.b
00000190: bf 0x20C00B0
00000194: push.builtin.v mouse_y
0000019C: push.builtin.v mouse_x
000001A4: call action_move_to(argc=2)
000001AC: popz