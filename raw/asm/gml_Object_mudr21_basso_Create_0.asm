// gml_Object_mudr21_basso_Create_0  locals=2 args=0 len=256
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x20CDE38
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20CDE38
00000040: b 0x20CDE40
00000044: popenv 0x40CDDFC
00000048: b 0x20CDE44
0000004C: popenv 0x1CCDE40
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20CDE74
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x20CDEB8
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x20CDEB8
000000C0: b 0x20CDEC0
000000C4: popenv 0x40CDE7C
000000C8: b 0x20CDEC4
000000CC: popenv 0x1CCDEC0
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x20CDEF4
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz