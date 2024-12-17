import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GmailService } from '../../services/gmail.service';
import { Email } from '../../interfaces/response-email.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly emailService: GmailService = inject(GmailService);

  public isLoading: boolean = true;
  public emails: Email[] = [];

  ngOnInit(): void {
    this.emailService.getAllEmails().subscribe((emails: Email[]) => {
      this.emails = emails;
      this.isLoading = false;
    });
  }

  public onDelete(id: string): void {
    this.emailService.deleteEmail(id).subscribe({
      next: () => {
        console.log(`Email con ID ${id} eliminado correctamente.`);
        this.emails = this.emails.filter((email) => email.id !== id); // actualiza la lista
      },
      error: (err) => {
        console.error('Error al eliminar el email:', err);
      },
    });
  }
}
