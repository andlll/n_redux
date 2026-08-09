// gml_Object_monspi_Create_0  locals=2 args=0 len=264
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: pop.v.i life
0000000C: push.imm.e 7
00000010: conv.i.v
00000014: push.imm.e 4
00000018: conv.i.v
0000001C: call random_range(argc=2)
00000024: push.imm.e 30
00000028: conv.i.v
0000002C: call action_set_motion(argc=2)
00000034: popz
00000038: push.imm.e -3990
0000003C: pop.v.i depth
00000044: push.imm.e 1
00000048: pop.v.i desto
00000050: push.imm.e 455
00000054: pushenv 0x20B3DBC
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.v night
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20B3DBC
00000090: b 0x20B3DC4
00000094: popenv 0x40B3D80
00000098: b 0x20B3DC8
0000009C: popenv 0x1CB3DC4
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20B3DF8
000000B0: push.imm.e 1
000000B4: conv.i.v
000000B8: push.i 16366009
000000C0: conv.i.v
000000C4: call action_sprite_color(argc=2)
000000CC: popz
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.imm.e 750
000000DC: conv.i.v
000000E0: call action_set_alarm(argc=2)
000000E8: popz
000000EC: push.imm.e 5
000000F0: conv.i.v
000000F4: push.imm.e 45
000000F8: conv.i.v
000000FC: call action_set_alarm(argc=2)
00000104: popz